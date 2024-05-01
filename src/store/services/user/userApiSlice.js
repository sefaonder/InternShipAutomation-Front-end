import { apiSlice } from 'src/app/api/apiSlice';

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({ url: '/api/user/get', params: params }),
    }),

    getUserDetail: builder.query({
      query: (internStatusId) => ({ url: `/api/user/get/${internStatusId}` }),
    }),

    updateUser: builder.mutation({
      query: ({ payload, internStatusId }) => ({
        url: `/api/user/update/${internStatusId}`,
        method: 'PUT',
        body: payload,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserDetailQuery, useUpdateUserMutation } = userSlice;
