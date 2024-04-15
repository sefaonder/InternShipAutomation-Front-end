import { apiSlice } from './apiSlice';

export const autocompleteSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentAC: builder.query({
      query: (params) => ({ url: '/api/user/autocomplete/student', params: params }),
    }),
  }),
});

export const { useGetStudentACQuery } = autocompleteSlice;
