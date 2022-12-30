import { GET, POST } from "../../Api/Config";
import { SHOW_NOTIFICATION } from "../type/Alert";
import {
  LOGOUT_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_UP_SUCCESS,
} from "../type/Auth";

export const signInAction = (gmail, password) => async (dispatch) => {
  try {
    dispatch({ type: SHOW_NOTIFICATION, payload: { status: "loading" } });
    const data = { gmail, password };
    const res = await POST("auth/login", data);
    dispatch({ type: SIGN_IN_SUCCESS, data: res.data });
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "success", message: res.data.msg },
    });
    await localStorage.setItem("isLogin", "true");
  } catch (error) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "error", message: error.response.data.msg },
    });
  }
};
export const signUpAction = (gmail, name, password) => async (dispatch) => {
  try {
    dispatch({ type: SHOW_NOTIFICATION, payload: { status: "loading" } });
    const data = { gmail, name, password };
    const res = await POST("auth/register", data);
    dispatch({ type: SIGN_UP_SUCCESS, data: res.data });
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "success", message: res.data.msg },
    });
  } catch (error) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "error", message: error.response.data.msg },
    });
  }
};
export const forgotPasswordAction = (gmail) => async (dispatch) => {
  try {
    const res = await POST("auth/forgot-password", { gmail });
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "success", message: res.data.msg },
    });
  } catch (error) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "error", message: error.response.data.msg },
    });
  }
};
export const resetPasswordAction =
  (password, confirmPassword, access_token) => async (dispatch) => {
    try {
      const body = {
        password,
        confirmPassword,
        access_token,
      };
      const res = await POST("auth/reset-password", body);
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "success", message: res.data.msg },
      });
      dispatch({ type: RESET_PASSWORD_SUCCESS });
    } catch (error) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "error", message: error.response.data.msg },
      });
    }
  };
export const refreshTokenAction = () => async (dispatch) => {
  try {
    const res = await GET("auth/refresh-token");
    dispatch({ type: SIGN_IN_SUCCESS, data: res.data });
  } catch (error) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "error", message: error.response.data.msg },
    });
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    localStorage.removeItem("isLogin");
    const res = await GET("auth/logout");
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "success", message: res.data.msg },
    });
    dispatch({ type: LOGOUT_SUCCESS, data: res.data });
  } catch (error) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "error", message: error.response.data.msg },
    });
  }
};
