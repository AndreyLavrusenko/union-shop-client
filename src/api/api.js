import {
    loginFailure,
    loginFailureServices,
    loginStart,
    loginSuccess,
    logoutFailure,
    logoutStart,
    logoutSuccess
} from "../redux/userSlice";
import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8080/",
})


export const authAPI = {
    loginByThirdPartyService: async (dispatch) => {
        dispatch(loginStart())
        try {
            const res = await instance.get('auth/login')
            dispatch(loginSuccess(res.data.token))
        } catch (err) {
            dispatch(loginFailureServices())
        }
    },

    loginByUnionId: async (dispatch, user) => {
        dispatch(loginStart())
        try {
            const res = await instance.post('auth/union/signin', user)
            dispatch(loginSuccess(res.data.token))
        } catch (err) {
            dispatch(loginFailure())
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
