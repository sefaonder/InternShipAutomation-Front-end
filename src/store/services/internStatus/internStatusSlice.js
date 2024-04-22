import { createSlice } from '@reduxjs/toolkit';

const internStatusSlice = createSlice({
  name: 'internStatus',
  initialState: {
    id: null,
    interview_id: null,
    form_id: null,
    user: {},
    status: null,
  },
  reducers: {
    setInternStatusData: (state, action) => {
      const { id, interview_id, form, form_id, user, status } = action.payload;
      state.id = id;
      state.interview_id = interview_id;
      state.form_id = form_id;

      state.form = { ...state.form, form };
      state.user = { ...state.user, user };
      state.status = status;
    },
    clearInternStatusData: (state, action) => {
      state.id = null;
      state.interview_id = null;
      state.form_id = null;

      state.user = {};
      state.form = {};
      state.status = null;
    },
  },
});

export const { setInternStatusData, clearInternStatusData } = internStatusSlice.actions;

export default internStatusSlice.reducer;

// export const selectCurrentUser = (state) => state.auth.email;
// export const selectCurrentToken = (state) => state.auth.token;
