import { apiSlice } from 'src/app/api/apiSlice';

export const internshipPanelSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Holidays

    getHolidays: builder.query({
      query: (params) => ({ url: '/api/internship-panel/holiday/get', params: params }),
    }),

    addHoliday: builder.mutation({
      query: (newForm) => ({
        url: '/api/internship-panel/holiday/add',
        method: 'POST',
        body: newForm,
      }),
    }),

    deleteHoliday: builder.mutation({
      query: (holidayId) => ({
        url: `/api/internship-panel/holiday/delete/${holidayId}`,
        method: 'DELETE',
      }),
    }),

    // EduYear

    getEduYears: builder.query({
      query: (params) => ({ url: '/api/internship-panel/eduyear/get', params: params }),
    }),

    addEduYear: builder.mutation({
      query: (newEduYear) => ({
        url: '/api/internship-panel/eduyear/add',
        method: 'POST',
        body: newEduYear,
      }),
    }),

    deleteEduYear: builder.mutation({
      query: (eduYearId) => ({
        url: `/api/internship-panel/eduyear/delete/${eduYearId}`,
        method: 'DELETE',
      }),
    }),

    // Internship Panel

    startInterviews: builder.mutation({
      query: (newEduYear) => ({
        url: '/api/internship-panel/startInterviews',
        method: 'POST',
        body: newEduYear,
      }),
    }),

    getConfidentalMailList: builder.query({
      query: (params) => ({ url: '/api/internship-panel/ConfidentalMailList/get', params: params }),
    }),

    getInterviewReady: builder.query({
      query: (params) => ({ url: '/api/internship-panel/InterviewReady/get', params: params }),
    }),

    // Active Follow Up

    getActiveFollowUp: builder.query({
      query: (params) => ({ url: '/api/internship-panel/activeFollowUp/get', params: params }),
    }),

    addActiveFollowUp: builder.mutation({
      query: ({ payload }) => ({
        url: '/api/internship-panel/activeFollowUp/add',
        method: 'POST',
        body: payload,
      }),
    }),

    updateActiveFollowUp: builder.mutation({
      query: ({ activeFollowUpId, payload }) => ({
        url: `/api/internship-panel/activeFollowUp/update/${activeFollowUpId}`,
        method: 'PUT',
        body: payload,
      }),
    }),
  }),
});

export const { useGetHolidaysQuery, useAddHolidayMutation, useDeleteHolidayMutation } = internshipPanelSlice;

export const { useGetEduYearsQuery, useAddEduYearMutation, useDeleteEduYearMutation } = internshipPanelSlice;

export const { useStartInterviewsMutation, useGetConfidentalMailListQuery, useGetInterviewReadyQuery } =
  internshipPanelSlice;

export const { useGetActiveFollowUpQuery, useAddActiveFollowUpMutation, useUpdateActiveFollowUpMutation } =
  internshipPanelSlice;
