import {createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isLoading: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isLoading = true
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isLoading = false;
            state.error = true;
        },
        loginFailureServices: (state) => {
            state.isLoading = false;
        },

        logoutStart: (state) => {
            state.isLoading = true
        },
        logoutSuccess: (state) => {
            state.isLoading = false;
            state.error = false;
            state.currentUser = null;
        },
        logoutFailure: (state) => {
            state.isLoading = false;
        },
    }
})

export const {loginStart, loginSuccess, loginFailure, logoutStart, logoutSuccess, logoutFailure, loginFailureServices} = userSlice.actions;
export default userSlice.reducer;