import {
  CREATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  EDIT_TASK_SUCCESS,
  GET_ALL_TASK_SUCCESS,
} from "../type/Task";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_TASK_SUCCESS:
      return action.data;
    case CREATE_TASK_SUCCESS:
      return [...state, action.data];
    case EDIT_TASK_SUCCESS:
      let editTask = state.map((item) =>
        item._id === action.data._id ? action.data : item
      );
      return editTask;
    case DELETE_TASK_SUCCESS:
      let deleteTask = state.filter((item) => item._id !== action.data._id);
      return deleteTask;
    default:
      return state;
  }
};
