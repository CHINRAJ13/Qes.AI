import { createSlice } from '@reduxjs/toolkit'

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        loading: false,
        post: {},
        error: null
    },
    reducers: {
        postCreateRequest(state, action) {
            return {
                loading: true,
            }
        },
        postCreateSuccess(state, action) {
            return {
                loading: false,
                post: action.payload.post,
            }
        },
        postCreateFail(state, action) {
            return {
                loading: false,
                error: action.payload.error
            }
        },
        getPostRequest(state, action) {
            return {
                loading: true,
            }
        },
        getPostSuccess(state, action) {
            return {
                loading: false,
                post: action.payload.post
            }
        },
        getPostFail(state, action) {
            return {
                loading: false,
                error: action.payload.error
            }
        },
    }
})

export const {
    postCreateFail,
    postCreateRequest,
    postCreateSuccess,
    getPostFail,
    getPostRequest,
    getPostSuccess,
} = postSlice.actions;

export default postSlice.reducer;