import axios from 'axios'
import { loadUserFail, loadUserRequest, loadUserSuccess, userLoginFail, userLoginRequest, userLoginSuccess, userLogoutFail, userLogoutRequest, userLogoutSuccess, userRegisterFail, userRegisterRequest, userRegisterSuccess } from '../slice/userSlice';

axios.defaults.withCredentials = true;

export const BACKEN_URI = 'http://localhost:3000/api';

export const loadUser = () => async (dispatch) => {
    try {
        dispatch(loadUserRequest())
        const {data} = await axios.get(`${BACKEN_URI}/users/get-user`);
        dispatch(loadUserSuccess(data));
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message));
        // console.log(error);
    }
}

export const loginUser = ({email, password}) => async (dispatch) => {
    try {
        dispatch(userLoginRequest())
        const {data} = await axios.post(`${BACKEN_URI}/users/login`, {email, password});
        dispatch(userLoginSuccess(data));
    } catch (error) {
        dispatch(userLoginFail(error.response.data.message));
        // console.log(error);
    }
}

export const registerUser = ({email, password, name}) => async (dispatch) => {
    try {
        dispatch(userRegisterRequest())
        const {data} = await axios.post(`${BACKEN_URI}/users/register`, {email, password, name});
        dispatch(userRegisterSuccess(data));
    } catch (error) {
        dispatch(userRegisterFail(error.response.data.message));
        // console.log(error);
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch(userLogoutRequest())
        await axios.post(`${BACKEN_URI}/users/logout`, {});
        dispatch(userLogoutSuccess());
    } catch (error) {
        dispatch(userLogoutFail(error.response.data.message));
        // console.log(error);
    }
}