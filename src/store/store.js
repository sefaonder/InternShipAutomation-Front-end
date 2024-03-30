import {configureStore} from '@reduxjs/toolkit'
import { apiSlice } from 'src/app/api/apiSlice'
import appSlice from 'src/store/services/app/appSlice'
import authReducer from "src/store/services/auth/authSlice"

export const store = configureStore({
    reducer:{
        app : appSlice,
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
        devTools:true
})