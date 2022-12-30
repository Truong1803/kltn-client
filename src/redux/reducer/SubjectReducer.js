import {
  CREATE_SUBJECT_SUCCESS,
  DELETE_SUBJECT_SUCCESS,
  EDIT_SUBJECT_SUCCESS,
  GET_ALL_SUBJECT_REQUEST,
  GET_ALL_SUBJECT_SUCCESS,
  GET_SUBJECT_BY_DEPARTMENT_SUCCESS,
} from "../type/Subject";
export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_SUBJECT_SUCCESS:
      let subject = action.data;
      return subject;
    case GET_SUBJECT_BY_DEPARTMENT_SUCCESS:
      return action.data;
    case CREATE_SUBJECT_SUCCESS:
      return [...state, action.data[0]];
    case EDIT_SUBJECT_SUCCESS:
      const editSubject = state.map((subject) =>
        subject._id === action.data[0]._id ? action.data[0] : subject
      );
      return editSubject;
    case DELETE_SUBJECT_SUCCESS:
      const newSubject = state.filter(
        (subject) => subject.id !== action.data.id
      );
      return newSubject;
    default:
      return state;
  }
};
