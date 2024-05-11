import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from 'src/app/api/apiSlice';
import appSlice from 'src/store/services/app/appSlice';

import authReducer from 'src/store/services/auth/authSlice';

import profileReducer from 'src/store/services/profile/ProfileSlice';

import internFormReducer from 'src/store/services/internForm/internFormSlice';

import internStatusReducer from 'src/store/services/internStatus/internStatusSlice';

import interviewReducer from 'src/store/services/interview/interviewSlice';

import confidentalReportReducer from 'src/store/services/confidentalReport/confidentalReportSlice';

import surveyReducer from 'src/store/services/survey/surveySlice';

import userReducer from 'src/store/services/user/userSlice';

export const store = configureStore({
  reducer: {
    app: appSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    profile: profileReducer,
    internForm: internFormReducer,
    internStatus: internStatusReducer,
    interview: interviewReducer,
    confidentalReport: confidentalReportReducer,
    survey: surveyReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
