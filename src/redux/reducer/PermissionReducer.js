import {
  CREATE_PERMISSION_SUCCESS,
  DELETE_PERMISSION_SUCCESS,
  EDIT_PERMISSION_SUCCESS,
  GET_ALL_PERMISSION_SUCCESS,
} from "../type/Permission";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_PERMISSION_SUCCESS:
      return action.data;
    case CREATE_PERMISSION_SUCCESS:
      return [...state, action.data];
    case EDIT_PERMISSION_SUCCESS:
      let editPermission = state.map((item) =>
        item._id === action.data._id ? action.data : item
      );
      return editPermission;
    case DELETE_PERMISSION_SUCCESS:
      let deletePermission = state.filter((item) => item._id !== action.data._id);

      return deletePermission;
    default:
      return state;
  }
};
