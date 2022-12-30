import { GET_ROLE_BY_POSITION_SUCCESS } from "../type/Role";

export default (state = [], action) => {
  switch (action.type) {
    case GET_ROLE_BY_POSITION_SUCCESS:
      return action.data;
    default:
      return state;
  }
};
