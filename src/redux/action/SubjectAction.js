import { DELETE, GET, POST, PUT } from "../../Api/Config";
import { SHOW_NOTIFICATION } from "../type/Alert";
import {
  CREATE_SUBJECT_SUCCESS,
  DELETE_SUBJECT_SUCCESS,
  EDIT_SUBJECT_SUCCESS,
  GET_ALL_SUBJECT_SUCCESS,
} from "../type/Subject";
export const getAllSubjectAction = (token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    let resp = await GET("subject", token);
    dispatch({
      type: GET_ALL_SUBJECT_SUCCESS,
      data: resp.data.data,
    });
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
export const createSubjectAction = (body, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    let resp = await POST(`subject`, body, token);
    dispatch({ type: CREATE_SUBJECT_SUCCESS, data: resp.data.data });
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
export const editSubjectAction = (body, token) => async (dispatch) => {
  try {
    let newBody = {
      name: body.name,
      id: body.id,
      manager_id: body.manager_id,
      department_id: body.department_id,
    };
    let resp = await PUT(`subject/${body._id}`, newBody, token);
    dispatch({ type: EDIT_SUBJECT_SUCCESS, data: resp.data.data });
  } catch (error) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "error", message: error.response.data.msg },
    });
  }
};
export const deleteSubjectAction = (id, token) => async (dispatch) => {
  try {
    let resp = await DELETE(`subject/${id}`, token);
    dispatch({ type: DELETE_SUBJECT_SUCCESS, data: resp.data.data });
  } catch (error) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "error", message: error.response.data.msg },
    });
  }
};

export const getSubjectByDepartmentAction =
  (department_id, token) => async (dispatch) => {
    try {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "loading" },
      });
      let resp = await GET(`subject/department/${department_id}`, token);
      dispatch({
        type: GET_ALL_SUBJECT_SUCCESS,
        data: resp.data.data,
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
