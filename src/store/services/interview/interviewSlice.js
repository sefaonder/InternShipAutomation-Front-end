import { createSlice } from '@reduxjs/toolkit';

const interviewSlice = createSlice({
  name: 'internStatus',
  initialState: {
    id: null,
    date: null,
    intern: {},
    comission: {},
    InternStatus: {},
  },
  reducers: {
    setInterviewData: (state, action) => {
      const { id, date, intern, comission, InternStatus } = action.payload;
      state.id = id;
      state.date = date;

      state.intern = { ...state.intern, intern };
      state.comission = { ...state.comission, comission };
      state.InternStatus = { ...state.InternStatus, InternStatus };
    },
    clearInterviewData: (state, action) => {
      state.id = null;
      state.date = null;

      state.intern = {};
      state.comission = {};
      state.InternStatus = {};
    },
  },
});

export const { setInterviewData, clearInterviewData } = interviewSlice.actions;

export default interviewSlice.reducer;

// export const selectCurrentUser = (state) => state.auth.email;
// export const selectCurrentToken = (state) => state.auth.token;
