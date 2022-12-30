import {
  CREATE_LECTURER_SUCCESS,
  DELETE_LECTURER_SUCCESS,
  EDIT_LECTURER_SUCCESS,
  GET_ALL_LECTURER_SUCCESS,
  GET_LECTURER_BY_ID_SUCCESS,
} from "../type/Lecturer";
import { UPLOAD_USER_AUTH } from "../type/UserAuth";

export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_LECTURER_SUCCESS:
      let lecturer = action.data;
      return lecturer;
    case CREATE_LECTURER_SUCCESS:
      const newLecturer = action.data;
      const newListLecturers = [...state];
      newListLecturers.unshift(newLecturer);
      return newListLecturers;
    case UPLOAD_USER_AUTH: {
      const newListUser = action.data.concat([...state]);
      return newListUser;
    }
    case EDIT_LECTURER_SUCCESS:
      const editLecturer = state.map((lecturer) =>
        lecturer._id === action.data._id ? action.data : lecturer
      );
      return editLecturer;
    case DELETE_LECTURER_SUCCESS:
      const newLecturers = state.filter((item) => item._id !== action.data._id);
      return newLecturers;
    case GET_LECTURER_BY_ID_SUCCESS:
      return action.data;
    default:
      return state;
  }
};
