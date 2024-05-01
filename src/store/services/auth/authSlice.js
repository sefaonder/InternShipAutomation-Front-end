import { createSlice } from '@reduxjs/toolkit';

const userCredentials = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : { token: null };

const initialState = {
  token: userCredentials.token,
  roles: null,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, roles, userId } = action.payload;
      state.roles = roles;
      state.token = accessToken;
      state.userId = userId;
    },
    logOut: (state, action) => {
      state.roles = null;
      state.token = null;
      state.userId = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
