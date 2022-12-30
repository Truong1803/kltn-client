import {
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  EDIT_CATEGORY_SUCCESS,
  GET_ALL_CATEGORY_SUCCESS,
} from "../type/Category";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY_SUCCESS:
      return action.data;
    case CREATE_CATEGORY_SUCCESS:
      return [...state, action.data];
    case EDIT_CATEGORY_SUCCESS:
      let editCategory = state.map((item) =>
        item._id === action.data._id ? action.data : item
      );
      return editCategory;
    case DELETE_CATEGORY_SUCCESS:
      let deleteCategory = state.filter((item) => item._id !== action.data._id);
      return deleteCategory;
    default:
      return state;
  }
};
