import { apiSlice } from 'src/app/api/apiSlice';

export const getProfileSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.mutation({
      query: () => ({
        url: '/api/profile/myprofile',
        method: 'GET',
      }),
    }),
    updateProfile: builder.mutation({
      query: (credentials) => ({
        url: '/api/profile/update',
        method: 'PUT',
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useGetProfileMutation } = getProfileSlice;
export const { useUpdateProfileMutation } = getProfileSlice;
