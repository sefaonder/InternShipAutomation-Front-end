import { createSlice } from '@reduxjs/toolkit';

const userCredentials = localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem('token'))
  : { roles: null, token: null };

const initialState = {
  roles: userCredentials.roles,
  token: userCredentials.token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { roles, accessToken } = action.payload;
      state.roles = roles;
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.roles = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
