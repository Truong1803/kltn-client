import { EDIT_USER_AUTH, GET_USER_AUTH } from "../type/UserAuth";

export default (state = [], action) => {
  switch (action.type) {
    case GET_USER_AUTH:
      return action.data;
    case EDIT_USER_AUTH: {
      return action.data;
    }

    default:
      return state;
  }
};
