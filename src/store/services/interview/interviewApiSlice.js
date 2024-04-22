import { apiSlice } from 'src/app/api/apiSlice';

export const interviewSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInterviews: builder.query({
      query: (params) => ({ url: '/api/interview/get', params: params }),
    }),
    getInterviewDetail: builder.query({
      query: (interviewId) => ({ url: `/api/intern-status/get/${interviewId}` }),
    }),

    createNewInterview: builder.mutation({
      query: (newForm) => ({
        url: '/api/interview/add',
        method: 'POST',
        body: newForm,
      }),
    }),

    updateInterview: builder.mutation({
      query: ({ payload, interviewId }) => ({
        url: `/api/interview/update/${interviewId}`,
        method: 'PUT',
        body: payload,
      }),
    }),
  }),
});

export const { useGetInterviewsQuery, useGetInterviewDetailQuery } = interviewSlice;

export const { useUpdateInterviewMutation, useCreateNewInterviewMutation } = interviewSlice;
