import { DELETE, GET, POST, PUT } from "../../Api/Config";
import { SHOW_NOTIFICATION } from "../type/Alert";
import {
  CREATE_LECTURER_SUCCESS,
  DELETE_LECTURER_SUCCESS,
  EDIT_LECTURER_SUCCESS,
  GET_ALL_LECTURER_SUCCESS,
  GET_LECTURER_BY_ID_SUCCESS,
} from "../type/Lecturer";
export const getAllLecturerAction =
  (department_id, subject_id, token) => async (dispatch) => {
    try {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "loading" },
      });
      let resp = await GET(
        `user?department_id=${department_id}&subject_id=${subject_id}`,
        token
      );
      dispatch({
        type: GET_ALL_LECTURER_SUCCESS,
        data: resp.data,
      });
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "success" },
      });
    } catch (error) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "error", message: error.response.data.msg },
      });
    }
  };
export const createLecturerAction = (body, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    let resp = await POST(`user`, body, token);
    dispatch({ type: CREATE_LECTURER_SUCCESS, data: resp.data.newUser });
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "success", message: resp.data.msg },
    });
  } catch (error) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "error", message: error.response.data.msg },
    });
  }
};
export const editLecturerAction = (body, token) => async (dispatch) => {
  try {
    let resp = await PUT(`user/${body._id}`, body, token);
    dispatch({ type: EDIT_LECTURER_SUCCESS, data: resp.data.user });
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "success", message: resp.data.msg },
    });
  } catch (error) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "error", message: error.response.data.msg },
    });
  }
};
export const deleteLecturerAction = (id, token) => async (dispatch) => {
  try {
    let resp = await DELETE(`user/${id}`, token);

    dispatch({ type: DELETE_LECTURER_SUCCESS, data: resp.data.data });
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "success", message: resp.data.msg },
    });
  } catch (error) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "error", message: error.response.data.msg },
    });
  }
};

export const getLecturerByIdAction = (id, token) => async (dispatch) => {
  try {
    let resp = await GET(`user/${id}`, token);
    dispatch({ type: GET_LECTURER_BY_ID_SUCCESS, data: resp.data.user });
  } catch (error) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "error", message: error.response.data.msg },
    });
  }
};
