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


import axios from "axios";
import {addCart, cartError, cartStart, cartSuccess} from "../redux/slices/cartSlice";

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
    renderTop: async () => {
        try {
            const {data} = await instance.get('product/top')
            return data;
        } catch (err) {
            console.log(err)
        }
    },

    // Рендер 3 полосок после популярной
    renderCategory: async () => {
        try {
            const firstCategory = await instance.get('product/popular/1')

            const secondCategory = await instance.get('product/popular/2')

            const thirdCategory = await instance.get('product/popular/3')

            return {
                firstCategory,
                secondCategory,
                thirdCategory
            }

        } catch (err) {
            console.log(err)
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
    },

    getProductById: async (id) => {
        return await instance.get(`/product/${id}`)
    }
}


export const cartAPI = {
    setProduct: async (product, dispatch) => {
        dispatch(cartStart())
        try {
            const res = await instance.post('/cart', product)
            dispatch(cartSuccess(res.data))
            dispatch(addCart())
        } catch (err) {
            dispatch(cartError())
        }
    }
}


export const systemAPI = {
    getCopyright: async () => {
        const {data} = await instance.get('system/copyright')
        return data
    }
}