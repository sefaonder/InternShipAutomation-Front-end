import { apiSlice } from 'src/app/api/apiSlice';

export const getProfileSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: '/api/profile/myprofile',
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

export const { useGetProfileQuery } = getProfileSlice;
export const { useUpdateProfileMutation } = getProfileSlice;
