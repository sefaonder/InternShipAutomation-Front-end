import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from 'src/store/services/auth/authSlice';
import { Mutex } from 'async-mutex';
import { enqueueSnackbar } from 'notistack';
import parseJWT from '../handlers/jwtHandler';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080',
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

          // TODO: 404
          const parsedData = parseJWT(refreshResult.data.accessToken);
          console.log('userId', parsedData);
          api.dispatch(setCredentials({ ...refreshResult.data, roles: parsedData.roles, userId: parsedData.userId }));

          // re-try the original query with new acces token

          result = await baseQuery(args, api, extraOptions);
        } else {
          const logOutResult = await baseQuery('/auth/logout', api, extraOptions);
          // api.dispatch(api.util.resetApiState());
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

  if (result.error && result.error.status === 400) {
    const message = result.error.data?.message?.errorCode || '';
    enqueueSnackbar(message, { variant: 'error' });
  }

  if (result.error && result.error.status === 403) {
    const message = result.error.data?.message?.errorCode || '';
    enqueueSnackbar(message, { variant: 'error' });
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
