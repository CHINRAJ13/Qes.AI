import axios from "axios";
import { getPostFail, getPostRequest, getPostSuccess, postCreateFail, postCreateRequest, postCreateSuccess } from "../slice/postSlice";
import { BACKEN_URI } from "./userAction";

axios.defaults.withCredentials = true;

// const BACKEN_URI = 'http://localhost:3000/api'

export const addPost = ({projectId, topic, content}) => async (dispatch) => {
    try {
        dispatch(postCreateRequest())
        const {data} = await axios.post(`${BACKEN_URI}/post/${projectId}`, {topic, content})
        dispatch(postCreateSuccess(data))
    } catch (error) {
        dispatch(postCreateFail(error.response.data.message))
    }
}

export const getPost = ({postId}) => async (dispatch) => {
    try {
        dispatch(getPostRequest())
        const {data} = await axios.get(`${BACKEN_URI}/post/${postId}`)
        // console.log(data)
        dispatch(getPostSuccess(data))
    } catch (error) {
        dispatch(getPostFail(error.response.data.message))
    }
}