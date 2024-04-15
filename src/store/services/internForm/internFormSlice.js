import { createSlice } from '@reduxjs/toolkit';

const internFormSlice = createSlice({
  name: 'internForm',
  initialState: {
    startDate: null,
    endDate: null,
    eduYear: null,
    studentInfo: {},
    companyInfo: {},
    student: {},
    followUp: {},
  },
  reducers: {
    setInternFormData: (state, action) => {
      const { startDate, endDate, eduYear, studentInfo, companyInfo, student, followUp } = action.payload;
      state.startDate = startDate;
      state.endDate = endDate;
      state.eduYear = eduYear;
      state.studentInfo = { ...state.studentInfo, studentInfo };
      state.companyInfo = { ...state.companyInfo, companyInfo };
      state.student = { ...state.student, student };
      state.followUp = { ...state.followUp, followUp };
    },
    clearInternFormData: (state, action) => {
      state.startDate = null;
      state.endDate = null;
      state.eduYear = null;
      state.studentInfo = {};
      state.companyInfo = {};
      state.student = {};
      state.followUp = {};
    },
    setStudentInfoData: (state, action) => {
      const { studentInfo } = action.payload;
      state.studentInfo = { ...state.studentInfo, studentInfo };
    },
    setCompanyInfoData: (state, action) => {
      const { companyInfo } = action.payload;
      state.companyInfo = { ...state.companyInfo, companyInfo };
    },
  },
});

export const { setInternFormData, clearInternFormData, setStudentInfoData, setCompanyInfoData } =
  internFormSlice.actions;

export default internFormSlice.reducer;

// export const selectCurrentUser = (state) => state.auth.email;
// export const selectCurrentToken = (state) => state.auth.token;
