import { apiSlice } from 'src/app/api/apiSlice';

export const ConfidentalReportSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConfidentalReports: builder.query({
      query: () => ({
        url: '/api/confidental/get',
      }),
    }),
    getConfidentalReport: builder.query({
      query: (confidentalReportId) => ({ url: `/api/confidental/get/${confidentalReportId}` }),
    }),
    createNewConfidentalReport: builder.mutation({
      query: (newConfidentalReport) => ({
        url: '/api/confidental/add',
        method: 'POST',
        body: newConfidentalReport,
      }),
    }),
    updateConfidentalReport: builder.mutation({
      query: ({ payload, confidentalReportId }) => ({
        url: `/api/confidental/update/${confidentalReportId}`,
        method: 'PUT',
        body: payload,
      }),
    }),

    deleteConfidentalReport: builder.mutation({
      query: (confidentalReportId) => ({
        url: `/api/confidental/delete/${confidentalReportId}`,
        method: 'DELETE',
      }),
    }),

    getCompanyConfidentalReport: builder.query({
      query: (confidentalReportToken) => ({ url: `/company/confidential/get/${confidentalReportToken}` }),
    }),

    createCompanyConfidentalReport: builder.mutation({
      query: ({ payload, confidentalReportId }) => ({
        url: `/company/confidential/create/${confidentalReportId}`,
        method: 'PUT',
        body: payload,
      }),
    }),
  }),
});
export const { useGetConfidentalReportsQuery, useGetConfidentalReportQuery } = ConfidentalReportSlice;

export const {
  useCreateNewConfidentalReportMutation,
  useUpdateConfidentalReportMutation,
  useDeleteConfidentalReportMutation,
} = ConfidentalReportSlice;

export const { useGetCompanyConfidentalReportQuery, useCreateCompanyConfidentalReportMutation } =
  ConfidentalReportSlice;
