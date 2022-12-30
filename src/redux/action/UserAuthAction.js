import { GET, POST, PUT } from "../../Api/Config";
import { checkImage, imageUpload } from "../../Common/Upload/imageUpload";
import {
  EDIT_USER_AUTH,
  GET_USER_AUTH,
  UPLOAD_USER_AUTH,
} from "../../redux/type/UserAuth";
import { SHOW_NOTIFICATION } from "../type/Alert";

export const getUserAuth = (id, token) => async (dispatch) => {
  try {
    let resp = await GET(`user/${id}`, token);
    dispatch({ type: GET_USER_AUTH, data: resp.data });
  } catch (error) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "error", message: error.response.data.msg },
    });
  }
};
export const editUserAuthAction = (body, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    let url = "";
    if (typeof body.avatar !== "string") {
      const check = checkImage(body.avatar);
      if (check) {
        return dispatch({
          type: SHOW_NOTIFICATION,
          payload: { status: "error", message: check },
        });
      }
      const photo = await imageUpload(body.avatar);
      url = photo.url;
      body.avatar = url;
    }
    let resp = await PUT(`user/${body._id}`, body, token);

    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "success", message: resp.data.msg },
    });
    dispatch({ type: EDIT_USER_AUTH, data: resp.data.user });
  } catch (error) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "error", message: error.response.data.msg },
    });
  }
};

export const uploadUserAuthAction = (body, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    let resp = await POST(`user/upload`, body, token);
    dispatch({ type: UPLOAD_USER_AUTH, data: resp.data.newUsers });
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
