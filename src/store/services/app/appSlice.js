import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    theme : 'light',
    isDrawerOpen : false
}

export const appSlice = createSlice({
    name:'app',
    initialState,
    reducers: {
        switchTheme: (state) => {
            state.theme === 'light' ? state.theme = 'dark' : state.theme = 'light'
        },
        openSideBar: (state,action) => {
            state.isDrawerOpen = action.payload.isDrawerOpen
        }
    }
})

export const {switchTheme,openSideBar} = appSlice.actions

export default appSlice.reducer