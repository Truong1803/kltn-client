import { DELETE, GET, POST, PUT } from "../../Api/Config";
import { SHOW_NOTIFICATION } from "../type/Alert";
import {
  CREATE_DEPARTMENT_SUCCESS,
  DELETE_DEPARTMENT_SUCCESS,
  EDIT_DEPARTMENT_SUCCESS,
  GET_ALL_DEPARTMENT_SUCCESS,
} from "../type/Department";
export const getAllDepartmentAction = (token) => async (dispatch) => {
  try {
    dispatch({ type: SHOW_NOTIFICATION, payload: { status: "loading" } });
    let resp = await GET("department", token);
    dispatch({
      type: GET_ALL_DEPARTMENT_SUCCESS,
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
export const createDepartmentAction = (body, token) => async (dispatch) => {
  try {
    dispatch({ type: SHOW_NOTIFICATION, payload: { status: "loading" } });
    let resp = await POST(`department`, body, token);
    dispatch({ type: CREATE_DEPARTMENT_SUCCESS, data: resp.data.data });
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "success", payload: { message: resp.data.msg } },
    });
  } catch (error) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "error", message: error.response.data.msg },
    });
  }
};
export const editDepartmentAction = (body, token) => async (dispatch) => {
  try {
    dispatch({ type: SHOW_NOTIFICATION, payload: { status: "loading" } });
    let newBody = {
      name: body.name,
      id: body.id,
      manager_id: body.manager_id,
    };
    let resp = await PUT(`department/${body._id}`, newBody, token);
    dispatch({ type: EDIT_DEPARTMENT_SUCCESS, data: resp.data.data });
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
export const deleteDepartmentAction = (id, token) => async (dispatch) => {
  try {
    let resp = await DELETE(`department/${id}`, token);
    dispatch({ type: DELETE_DEPARTMENT_SUCCESS, data: resp.data.data });
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
