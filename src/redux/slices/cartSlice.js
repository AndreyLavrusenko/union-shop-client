import {createSlice} from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        isLoading: false,
        error: false,
        quantity: 0,
    },
    reducers: {
        cartStart: (state) => {
            state.isLoading = true;
            state.error = false;
        },
        cartSuccess: (state) => {
            state.isLoading = false;
            state.error = false;
        },
        cartError: (state) => {
            state.isLoading = false;
            state.error = true;
        },
        addCart: (state) => {
            state.quantity += 1
        }
    }
})


export const {cartStart, cartSuccess, cartError, addCart} = cartSlice.actions

export default cartSlice.reducer