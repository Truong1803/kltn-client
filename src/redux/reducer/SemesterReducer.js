import {
  CREATE_SEMESTER_SUCCESS,
  DELETE_SEMESTER_SUCCESS,
  EDIT_SEMESTER_SUCCESS,
  GET_ALL_SEMESTER_SUCCESS,
} from "../type/Semester";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SEMESTER_SUCCESS:
      return action.data;
    case CREATE_SEMESTER_SUCCESS:
      const dataSemester = action.data;
      const createSemester = [...state];
      createSemester.unshift(dataSemester);
      return createSemester;
    case EDIT_SEMESTER_SUCCESS:
      let editRank = state.map((item) =>
        item._id === action.data._id ? action.data : item
      );
      return editRank;
    case DELETE_SEMESTER_SUCCESS:
      let deleteRank = state.filter((item) => item._id !== action.data._id);
      return deleteRank;
    default:
      return state;
  }
};
