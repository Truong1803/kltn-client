import { DELETE, GET, POST, PUT } from "../../Api/Config";
import { SHOW_NOTIFICATION } from "../type/Alert";
import {
  CREATE_ROLE_SUCCESS,
  DELETE_ROLE_SUCCESS,
  EDIT_ROLE_SUCCESS,
  GET_ALL_ROLE_SUCCESS,
  GET_ROLE_BY_ID_SUCCESS,
  GET_ROLE_BY_POSITION_SUCCESS,
} from "../type/Role";
export const getAllRoleAction = (token) => async (dispatch) => {
  try {
    dispatch({ type: SHOW_NOTIFICATION, payload: { status: "loading" } });
    const resp = await GET("role", token);
    dispatch({ type: GET_ALL_ROLE_SUCCESS, data: resp.data.roles });
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

export const createRoleAction = (body, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    const resp = await POST(`role`, body, token);
    dispatch({
      type: CREATE_ROLE_SUCCESS,
      data: resp.data.newRole,
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
export const editRoleAction = (body, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });

    const resp = await PUT(`role/${body._id}`, body, token);
    dispatch({
      type: EDIT_ROLE_SUCCESS,
      data: resp.data.updateRole,
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
export const deleteRoleAction = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    const resp = await DELETE(`role/${id}`, token);
    dispatch({
      type: DELETE_ROLE_SUCCESS,
      data: resp.data.deleteRole,
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
export const getRoleByPositionAction = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });

    const resp = await GET(`role/${id}`, token);
    dispatch({
      type: GET_ROLE_BY_POSITION_SUCCESS,
      data: resp.data.role.permissions,
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
export const getRoleByIDAction = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });

    const resp = await GET(`role/${id}`, token);
    dispatch({
      type: GET_ROLE_BY_ID_SUCCESS,
      data: resp.data.role,
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
