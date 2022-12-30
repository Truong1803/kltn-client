import { SHOW_NOTIFICATION } from "../type/Alert";

export default (state = {}, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return action.payload;

    default:
      return state;
  }
};
