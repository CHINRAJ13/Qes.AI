import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'User',
    initialState: {
        user: {},
        loading: false,
        isAuthenticated: false,
        error: null,
    },
    reducers: {
        loadUserRequest(state, action) {
            return {
                loading: true,
            }
        },
        loadUserSuccess(state, action) {
            return {
                loading: false,
                user: action.payload.user,
                isAuthenticated: true,
            }
        },
        loadUserFail(state, action) {
            return {
                loading: false,
                error: action.payload.error,
            }
        },
        userLoginRequest(state, action) {
            return {
                loading: true,
            }
        },
        userLoginSuccess(state, action) {
            return {
                loading: false,
                user: action.payload.user,
                isAuthenticated: true,
            }
        },
        userLoginFail(state, action) {
            return {
                loading: false,
                error: action.payload.error
            }
        },
        userRegisterRequest(state, action) {
            return {
                loading: true,
            }
        },
        userRegisterSuccess(state, action) {
            return {
                loading: false,
                user: action.payload.user,
                isAuthenticated: true,
            }
        },
        userRegisterFail(state, action) {
            return {
                loading: false,
                error: action.payload.error
            }
        },
        userLogoutRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        userLogoutSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
            }
        },
        userLogoutFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        },
    }
})

export const {
    loadUserFail,
    loadUserRequest,
    loadUserSuccess,
    userLoginFail,
    userLoginRequest,
    userLoginSuccess,
    userRegisterFail,
    userRegisterSuccess,
    userRegisterRequest,
    userLogoutFail,
    userLogoutRequest,
    userLogoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;