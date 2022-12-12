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
import {cartError, cartStart, cartSuccess} from "../redux/slices/cartSlice";


let TOKEN = ""

if (localStorage.getItem("persist:root")) {
    if (JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser) {
        TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser;
    }

}

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
            const firstCategory = await instance.get('product/popular/first')

            const secondCategory = await instance.get('product/popular/second')

            const thirdCategory = await instance.get('product/popular/third')

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

    getAllCategory: async (category, page) => {
        const {data} = await instance.get(category
            ? `product/shop?category=${category}`
            : `product/shop?page=${page}`
        )

        return data
    },

    getProductById: async (id) => {
         try {
             return await instance.get(`/product/${id}`)
         } catch (err) {
             console.log(err.response.request)
         }
    },


}


export const cartAPI = {
    setProduct: async (product, dispatch) => {
        dispatch(cartStart())
        try {
            console.log(product)
            const res = await instance.post('/cart', product, {
                headers: {
                    token: `Bearer ${TOKEN}`
                }
            })
            dispatch(cartSuccess(res.data))
        } catch (err) {
            dispatch(cartError())
        }
    },

    getCart: async () => {
        const {data} = await instance.get('/cart/all', {
            headers: {
                token: `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser}`
            }
        })
        return data
    },

    getItemFromCart: async (uniqCode) => {
        const {data} = await instance.get(`/cart/item/${uniqCode}`, {
            headers: {
                token: `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser}`
            }
        })
        return data
    },

    getCartQuantity: async () => {
        const {data} = await instance.get('/cart/quantity', {
            headers: {
                token: `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser}`
            }
        })
        return data
    },

    deleteItemFromCart: async (id) => {
        await instance.delete(`/cart/${id}`)
    }
}


export const orderAPI = {
    createOrder: async (deliverType, letter) => {
       return await instance.post('/order/delivery-method', {deliverType, letter}, {
            headers: {
                token: `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser}`
            }
        })
    },

    getOrderSum: async () => {
        return await instance.get('/order/order-sum', {
            headers: {
                token: `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser}`
            }
        })
    },

    setNewDeliveryPrice: async (price, deliveryType) => {
        return await instance.post('/order/change-price', {price, deliveryType}, {
            headers: {
                token: `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser}`
            }
        })
    },

    deleteCostOfDelivery: async () => {
        return await instance.put('/order/delete-delivery-method', {
            headers: {
                token: `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser}`
            }
        })
    }
}


export const systemAPI = {
    getCopyright: async () => {
        const {data} = await instance.get('system/copyright')
        return data
    }
}