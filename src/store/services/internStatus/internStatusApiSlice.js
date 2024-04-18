import { apiSlice } from 'src/app/api/apiSlice';

export const internStatusSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStatuses: builder.query({
      query: (params) => ({ url: 'api/intern-status/get', params: params }),
    }),

    getStatusDetail: builder.query({
      query: (internStatusId) => ({ url: `/api/intern-status/get/${internStatusId}` }),
    }),

    updateStatus: builder.mutation({
      query: ({ payload, internStatusId }) => ({
        url: `/api/intern-status/update/${internStatusId}`,
        method: 'PUT',
        body: payload,
      }),
    }),
  }),
});

export const { useGetStatusesQuery, useGetStatusDetailQuery, useUpdateStatusMutation } = internStatusSlice;
