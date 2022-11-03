import {createSlice} from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: "product",
    initialState: {
        topProducts: [],
        categoryProducts: {
            firstCategory: [],
            secondCategory: [],
            thirdCategory: [],
        },
        allProducts: [],
        isLoading: false,
        error: false
    },
    reducers: {
        productLoading: (state) => {
            state.isLoading = true
        },
        topProductSuccess: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.topProducts = action.payload
        },
        firstCategoryProductSuccess: (state, action) => {
            state.error = false;
            state.categoryProducts.firstCategory = action.payload
        },
        secondCategoryProductSuccess: (state, action) => {
            state.error = false;
            state.categoryProducts.secondCategory = action.payload
        },
        thirdCategoryProductSuccess: (state, action) => {
            state.error = false;
            state.categoryProducts.thirdCategory = action.payload
        },
        productFailure: (state) => {
            state.isLoading = false;
            state.error = true;
        }
    }
})


export const {
    productLoading,
    topProductSuccess,
    productFailure,
    firstCategoryProductSuccess,
    secondCategoryProductSuccess,
    thirdCategoryProductSuccess,
} = productSlice.actions
export default productSlice.reducer;