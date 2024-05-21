import { apiSlice } from 'src/app/api/apiSlice';

export const internStatusSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStatuses: builder.query({
      query: (params) => ({ url: '/api/intern-status/get', params: params }),
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

    getExcelList: builder.mutation({
      query: () => ({
        url: '/api/intern-status/download/excel',
        method: 'POST',
        responseHandler: async (response) => {
          if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'staj_durumu.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            return { data: 'ok' };
          }
        },
        cache: 'no-cache',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetStatusesQuery, useGetStatusDetailQuery, useUpdateStatusMutation, useGetExcelListMutation } =
  internStatusSlice;
