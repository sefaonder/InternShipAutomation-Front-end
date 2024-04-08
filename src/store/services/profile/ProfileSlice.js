import { createSlice } from '@reduxjs/toolkit';

const profile = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

const profileSlice = createSlice({
  name: 'profile',
  initialState: { user: profile },
  reducers: {
    setProfile: (state, action) => {
      state.user = action.payload;
    },
    removeProfile: (state, action) => {
      state.user = null;
    },
  },
});

export const { setProfile, removeProfile } = profileSlice.actions;

export default profileSlice.reducer;

export const selectCurrentUser = (state) => state.profile.user;
