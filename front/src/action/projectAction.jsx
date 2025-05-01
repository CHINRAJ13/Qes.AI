import axios from "axios";
import { getProjectFail, getProjectRequest, getProjectSuccess, projectCreateFail, projectCreateRequest, projectCreateSuccess } from "../slice/projectSlice";
import { BACKEN_URI } from "./userAction";

axios.defaults.withCredentials = true;

export const createProject = ({title}) => async (dispatch) => {
    try {
        dispatch(projectCreateRequest())
        const {data} = await axios.post(`${BACKEN_URI}/project/create`,{title})
        dispatch(projectCreateSuccess(data))
    } catch (error) {
        dispatch(projectCreateFail(error.response.data.message))
    }
}


export const getProject = ({ projectId }) => async (dispatch) => {
    try {
        dispatch(getProjectRequest())
        const {data} = await axios.get(`${BACKEN_URI}/project/${projectId}`)
        dispatch(getProjectSuccess(data))
    } catch (error) {
        dispatch(getProjectFail(error.response.data.message))
    }
}