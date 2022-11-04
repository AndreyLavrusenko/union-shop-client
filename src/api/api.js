import {
    loginUnionFailure,
    loginOrRegFailure,
    loginFailureServices,
    loginStart,
    loginSuccess,
    logoutFailure,
    logoutStart,
    logoutSuccess
} from "../redux/slices/userSlice";
import {
    productFailure,
    productLoading,
    topProductSuccess,
    firstCategoryProductSuccess,
    secondCategoryProductSuccess,
    thirdCategoryProductSuccess,
} from "../redux/slices/productSlice";

import axios from "axios";
import category from "../pages/all/category/Category";

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8080/",
})


export const authAPI = {
    // Вход через сторонние сервисы
    loginByThirdPartyService: async (dispatch) => {
        dispatch(loginStart())
        try {
            const res = await instance.get('auth/login')
            dispatch(loginSuccess(res.data.token))
        } catch (err) {
            dispatch(loginFailureServices())
        }
    },

    // Вход через union id
    loginByUnionId: async (dispatch, user) => {
        dispatch(loginStart())
        try {
            const res = await instance.post('auth/union/signin', user)
            dispatch(loginSuccess(res.data.token))
            return res.data
        } catch (err) {
            dispatch(loginUnionFailure())
        }
    },

    // Вход обычным способом
    loginOrRegister: async (dispatch, user) => {
        dispatch(loginStart())
        try {
            const res = await instance.post('auth/signup', user)
            if (res.data.resultCode === 1) {
                dispatch(loginOrRegFailure())
            } else {
                dispatch(loginSuccess(res.data.token))
                return res.data
            }
        } catch (err) {
            dispatch(loginOrRegFailure())
        }
    },

    logout: async (dispatch) => {
        dispatch(logoutStart())
        try {
            dispatch(logoutSuccess())
            localStorage.removeItem('persist:root')
            await instance.get('auth/logout')
        } catch (err) {
            dispatch(logoutFailure())
        }
    }
}


export const productAPI = {
    renderTop: async (dispatch) => {
        dispatch(productLoading())
        try {
            const {data} = await instance.get('product/top')
            dispatch(topProductSuccess(data))
            return data;
        } catch (err) {
            dispatch(productFailure())
        }
    },

    // Рендер 3 полосок после популярной
    renderCategory: async (dispatch) => {
        dispatch(productLoading())
        try {
            const res = await instance.get('product/popular/1')
            dispatch(firstCategoryProductSuccess(res.data))

            const res2 = await instance.get('product/popular/2')
            dispatch(secondCategoryProductSuccess(res2.data))

            const res3 = await instance.get('product/popular/3')
            dispatch(thirdCategoryProductSuccess(res3.data))

        } catch (err) {
            dispatch(productFailure())
        }
    },

    // Реклама на главной странице
    getAdvertising: async () => {
        const {data} = await instance.get("product/advertising")
        return data
    },

    getAllCategoryType: async () => {
        const {data} = await instance.get('product/category')
        return data
    },

    getAllCategory: async (category, page ) => {
        const {data} = await instance.get(category
            ? `product/shop?category=${category}`
            : `product/shop?page=${page}`
        )

        return data
    }


}


export const systemAPI = {
    getCopyright: async () => {
        const {data} = await instance.get('system/copyright')
        return data
    }
}