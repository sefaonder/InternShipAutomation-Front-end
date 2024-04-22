import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from 'src/store/services/auth/authSlice';
import { Mutex } from 'async-mutex';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3001',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const mutex = new Mutex();

const baseQueryWithReauth = async (args, api, extraOptions) => {
  +(await mutex.waitForUnlock());
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          {
            url: 'auth/refresh/',
            method: 'POST',
          },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          const user = api.getState().auth.user;
          // store the new token

          api.dispatch(setCredentials({ ...refreshResult.data, user }));

          // re-try the original query with new acces token

          result = await baseQuery(args, api, extraOptions);
        } else {
          const logOutResult = await baseQuery('/auth/logout', api, extraOptions);
          api.dispatch(logOut());
          localStorage.removeItem('token');

          history.pushState(null, '', '/login');
          window.location.href = '/login';
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
