import { DELETE, GET, POST, PUT } from "../../Api/Config";
import { SHOW_NOTIFICATION } from "../type/Alert";
import {
  CREATE_PAYMENT_SUCCESS,
  DELETE_PAYMENT_SUCCESS,
  EDIT_PAYMENT_SUCCESS,
  GET_ALL_PAYMENT_SUCCESS,
} from "../type/Payment";
export const getALLPaymentAction = (token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    const resp = await GET("reward", token);
    dispatch({
      type: GET_ALL_PAYMENT_SUCCESS,
      data: resp.data.rewards,
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

export const createPaymentAction = (body, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    const resp = await POST(`reward`, body, token);
    dispatch({
      type: CREATE_PAYMENT_SUCCESS,
      data: resp.data.newReward,
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
export const editPaymentAction = (body, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });

    const resp = await PUT(`reward/${body._id}`, body, token);
    dispatch({
      type: EDIT_PAYMENT_SUCCESS,
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
export const deletePaymentAction = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    const resp = await DELETE(`reward/${id}`, token);
    dispatch({
      type: DELETE_PAYMENT_SUCCESS,
      data: resp.data.reward,
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
