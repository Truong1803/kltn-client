import {
  CREATE_ROLE_SUCCESS,
  DELETE_ROLE_SUCCESS,
  EDIT_ROLE_SUCCESS,
  GET_ALL_ROLE_SUCCESS,
  GET_ROLE_BY_ID_SUCCESS,
} from "../type/Role";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ROLE_SUCCESS:
      return action.data;
    case GET_ROLE_BY_ID_SUCCESS:
      return action.data;
    case CREATE_ROLE_SUCCESS:
      return [...state, action.data];
    case EDIT_ROLE_SUCCESS:
      let editRole = state.map((item) =>
        item._id === action.data._id ? action.data : item
      );
      return editRole;
    case DELETE_ROLE_SUCCESS:
      let deleteRole = state.filter((item) => item._id !== action.data._id);

      return deleteRole;
    default:
      return state;
  }
};
