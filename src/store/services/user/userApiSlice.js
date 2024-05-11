import { apiSlice } from 'src/app/api/apiSlice';

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({ url: '/api/user/get', params: params }),
    }),

    getUserDetail: builder.query({
      query: (internStatusId) => ({ url: `/api/user/get/${internStatusId}` }),
    }),

    addUser: builder.mutation({
      query: (payload) => ({
        url: `/api/user/add/`,
        method: 'POST',
        body: payload,
      }),
    }),

    updateUser: builder.mutation({
      query: ({ payload, userId }) => ({
        url: `/api/user/update/${userId}`,
        method: 'PUT',
        body: payload,
      }),
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/api/user/delete/${userId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserDetailQuery,
  useUpdateUserMutation,
  useAddUserMutation,
  useDeleteUserMutation,
} = userSlice;
