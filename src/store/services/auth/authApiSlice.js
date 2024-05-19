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

    register: builder.mutation({
      query: (credentials) => ({
        url: '/auth/signup',
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

    passwordResetRequest: builder.mutation({
      query: (credentials) => ({
        url: '/auth/password-reset',
        method: 'POST',
        body: { ...credentials },
      }),
    }),

    passwordReset: builder.mutation({
      query: ({ credentials, token }) => ({
        url: `/auth/password-reset/${token}`,
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;

export const { usePasswordResetMutation, usePasswordResetRequestMutation, useRegisterMutation } = authApiSlice;
