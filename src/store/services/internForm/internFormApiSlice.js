import { apiSlice } from 'src/app/api/apiSlice';

export const internFormSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getForms: builder.query({
      query: (params) => ({ url: '/api/intern-form/get', params: params }),
    }),

    getFormDetail: builder.query({
      query: (internFormId) => ({ url: `/api/intern-form/get/${internFormId}` }),
    }),

    createNewForm: builder.mutation({
      query: (newForm) => ({
        url: '/api/intern-form/add',
        method: 'POST',
        body: newForm,
      }),
    }),

    updateForm: builder.mutation({
      query: ({ payload, internFormId }) => ({
        url: `/api/intern-form/update/${internFormId}`,
        method: 'PUT',
        body: payload,
      }),
    }),

    unlockForm: builder.mutation({
      query: (internFormId) => ({
        url: `/api/intern-form/unlock/${internFormId}`,
        method: 'PUT',
      }),
    }),

    deleteForm: builder.mutation({
      query: (internFormId) => ({
        url: `/api/intern-form/delete/${internFormId}`,
        method: 'DELETE',
      }),
    }),

    createNewStudentInfo: builder.mutation({
      query: (newForm) => ({
        url: '/api/intern-form/student-info/add',
        method: 'POST',
        body: newForm,
      }),
    }),

    updateStudentInfo: builder.mutation({
      query: ({ payload, studentInfoId }) => ({
        url: `/api/intern-form/student-info/update/${studentInfoId}`,
        method: 'PUT',
        body: payload,
      }),
    }),

    createNewCompanyInfo: builder.mutation({
      query: (newForm) => ({
        url: '/api/intern-form/company-info/add',
        method: 'POST',
        body: newForm,
      }),
    }),

    updateCompanyInfo: builder.mutation({
      query: ({ payload, companyInfoId }) => ({
        url: `/api/intern-form/company-info/update/${companyInfoId}`,
        method: 'PUT',
        body: payload,
      }),
    }),
  }),
});

export const { useGetFormsQuery, useGetFormDetailQuery } = internFormSlice;

export const { useCreateNewFormMutation, useUpdateFormMutation, useDeleteFormMutation, useUnlockFormMutation } =
  internFormSlice;

// Student & Company Info
export const { useCreateNewStudentInfoMutation, useCreateNewCompanyInfoMutation } = internFormSlice;

export const { useUpdateStudentInfoMutation, useUpdateCompanyInfoMutation } = internFormSlice;
