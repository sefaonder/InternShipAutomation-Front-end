import {configureStore} from '@reduxjs/toolkit'
import appSlice from 'src/store/services/app/appSlice'

export const store = configureStore({
    reducer:{
        app : appSlice
    }
})