import { apiSlice } from 'src/app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/signin',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
