import { createSlice } from '@reduxjs/toolkit';

const confidentalReportSlice = createSlice({
  name: 'confidentalReport',
  initialState: {
    id: null,
    interview: null,
    company_name: '',
    address: '',
    start_date: '',
    end_date: '',
    days_of_absence: '',
    department: '',
    is_edu_program: '',
    intern_evaluation: {},
    auth_name: '',
    auth_position: '',
    reg_number: '',
    auth_tc_number: '',
    auth_title: '',
  },
  reducers: {
    setConfidentalReport: (state, action) => {
      const {
        company_name,
        address,
        start_date,
        end_date,
        days_of_absence,
        department,
        is_edu_program,
        intern_evaluation,
        auth_name,
        auth_position,
        reg_number,
        auth_tc_number,
        auth_title,
        interview,
        id,
      } = action.payload;
      state.company_name = company_name;
      state.address = address;
      state.start_date = start_date;
      state.end_date = end_date;
      state.department = department;
      state.days_of_absence = days_of_absence;
      state.is_edu_program = is_edu_program;
      state.intern_evaluation = intern_evaluation;
      state.auth_name = auth_name;
      state.auth_position = auth_position;
      state.reg_number = reg_number;
      state.auth_tc_number = auth_tc_number;
      state.auth_title = auth_title;
      state.interview = interview;
      state.id = id;
    },
    resetConfidentalReport: (state, action) => {
      state.company_name = null;
      state.address = null;
      state.start_date = null;
      state.end_date = null;
      state.department = null;
      state.days_of_absence = null;
      state.is_edu_program = null;
      state.intern_evaluation = null;
      state.auth_name = null;
      state.auth_position = null;
      state.reg_number = null;
      state.auth_tc_number = null;
      state.auth_title = null;
      state.interview = null;
      state.id = null;
    },
  },
});

export const { setConfidentalReport, resetConfidentalReport } = confidentalReportSlice.actions;

export default confidentalReportSlice.reducer;
