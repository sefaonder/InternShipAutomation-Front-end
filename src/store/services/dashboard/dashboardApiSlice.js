import { apiSlice } from 'src/app/api/apiSlice';

export const dashboardSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInterviewsCount: builder.query({
      query: () => ({ url: '/api/dashboard/interviewsCount' }),
    }),

    getFormsCount: builder.query({
      query: () => ({ url: `/api/dashboard/formsCount` }),
    }),

    getStudentActiveInternship: builder.query({
      query: () => ({ url: '/api/dashboard/studentActiveIntership' }),
    }),
  }),
});

export const { useGetInterviewsCountQuery, useGetFormsCountQuery, useGetStudentActiveInternshipQuery } = dashboardSlice;
