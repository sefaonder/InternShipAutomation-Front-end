import { createSlice } from '@reduxjs/toolkit';

const userCredentials = localStorage.getItem('user_info')
  ? JSON.parse(localStorage.getItem('user_info'))
  : { token: null, roles: null };

const initialState = {
  token: userCredentials.token,
  roles: userCredentials.roles,
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
