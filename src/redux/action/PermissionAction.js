import { DELETE, GET, POST, PUT } from "../../Api/Config";
import { SHOW_NOTIFICATION } from "../type/Alert";
import {
  CREATE_PERMISSION_SUCCESS,
  DELETE_PERMISSION_SUCCESS,
  EDIT_PERMISSION_SUCCESS,
  GET_ALL_PERMISSION_SUCCESS,
} from "../type/Permission";
export const getAllPermissionAction = (token) => async (dispatch) => {
  try {
    dispatch({ type: SHOW_NOTIFICATION, payload: { status: "loading" } });
    const resp = await GET("permission", token);
    dispatch({ type: GET_ALL_PERMISSION_SUCCESS, data: resp.data.permissions });
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

export const createPermissionAction = (body, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    const resp = await POST(`permission`, body, token);
    dispatch({
      type: CREATE_PERMISSION_SUCCESS,
      data: resp.data.newPermission,
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
export const editPermissionAction = (body, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });

    const resp = await PUT(`permission/${body._id}`, body, token);
    dispatch({
      type: EDIT_PERMISSION_SUCCESS,
      data: resp.data.permissionUpdated,
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
export const deletePermissionAction = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    const resp = await DELETE(`permission/${id}`, token);
    dispatch({
      type: DELETE_PERMISSION_SUCCESS,
      data: resp.data.permissionDeleted,
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
