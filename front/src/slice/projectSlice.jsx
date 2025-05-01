import { createSlice } from '@reduxjs/toolkit'

export const projectSlice = createSlice({
    name: 'project',
    initialState: {
        loading: false,
        project: {},
        posts: [],
        error: null,
    },
    reducers: {
        projectCreateRequest(state, action) {
            return {
                loading: true,
            }
        },
        projectCreateSuccess(state, action) {
            return {
                loading: false,
                project: action.payload.project
            }
        },
        projectCreateFail(state, action) {
            return {
                loading: false,
                error: action.payload.error
            }
        },
        getProjectRequest(state, action) {
            return {
                loading: true,
            }
        },
        getProjectSuccess(state, action) {
            return {
                loading: false,
                project: action.payload.project,
                posts: action.payload.project.posts
            }
        },
        getProjectFail(state, action) {
            return {
                loading: false,
                error: action.payload.error
            }
        },
    }
})

export const {
    projectCreateFail,
    projectCreateRequest,
    projectCreateSuccess,
    getProjectFail,
    getProjectRequest,
    getProjectSuccess,
} = projectSlice.actions;

export default projectSlice.reducer;