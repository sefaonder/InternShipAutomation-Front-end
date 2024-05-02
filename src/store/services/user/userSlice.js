import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    name: null,
    last_name: null,
    email: null,
    user_type: null,
    school_number: null,
    tc_number: null,
    isGraduate: null,
  },
  reducers: {
    setUserData: (state, action) => {
      const { id, name, last_name, email, user_type, school_number, tc_number, isGraduate } = action.payload;
      state.id = id;
      state.name = name;
      state.last_name = last_name;
      state.email = email;
      state.user_type = user_type;
      state.school_number = school_number;
      state.tc_number = tc_number;
      state.isGraduate = isGraduate;
    },
    clearUserData: (state, action) => {
      state.id = null;
      state.name = null;
      state.last_name = null;
      state.email = null;
      state.user_type = null;
      state.school_number = null;
      state.tc_number = null;
      state.isGraduate = null;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;

// export const selectCurrentUser = (state) => state.auth.email;
// export const selectCurrentToken = (state) => state.auth.token;
