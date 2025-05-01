import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/userSlice';
import projectReducer from './slice/projectSlice';
import postReducer from './slice/postSlice';

export const store = configureStore({
    reducer : {
        userState: userReducer,
        projectState: projectReducer,
        postState: postReducer,
    },
})