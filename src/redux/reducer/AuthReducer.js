import {
  LOGOUT_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_UP_SUCCESS,
} from "../type/Auth";

export default (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return action.data;
    case SIGN_UP_SUCCESS:
      return action.data;
    case RESET_PASSWORD_SUCCESS:
      window.location.pathname = "dang_nhap";
      return;
    case LOGOUT_SUCCESS:
      window.location.pathname = "dang_nhap";
      return;
    default:
      return state;
  }
};
