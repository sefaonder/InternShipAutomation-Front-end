import { createSlice } from '@reduxjs/toolkit';

const interviewSlice = createSlice({
  name: 'internStatus',
  initialState: {
    id: null,
    date: null,

    student: null,
    comission: null,
    internStatus: null,
  },
  reducers: {
    setInterviewData: (state, action) => {
      const { id, date, student, comission, internStatus } = action.payload;
      state.id = id;
      state.date = date;

      state.student = student;
      state.comission = comission;
      state.internStatus = internStatus;
    },
    clearInterviewData: (state, action) => {
      state.id = null;
      state.date = null;

      state.student = null;
      state.comission = null;
      state.internStatus = null;
    },
  },
});

export const { setInterviewData, clearInterviewData } = interviewSlice.actions;

export default interviewSlice.reducer;

// export const selectCurrentUser = (state) => state.auth.email;
// export const selectCurrentToken = (state) => state.auth.token;
