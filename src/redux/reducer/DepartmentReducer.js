import {
  CREATE_DEPARTMENT_SUCCESS,
  DELETE_DEPARTMENT_SUCCESS,
  EDIT_DEPARTMENT_SUCCESS,
  GET_ALL_DEPARTMENT_SUCCESS,
} from "../type/Department";

export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_DEPARTMENT_SUCCESS:
      let departments = action.data;
      return departments;
    case CREATE_DEPARTMENT_SUCCESS:
      return [...state, action.data[0]];
    case EDIT_DEPARTMENT_SUCCESS:
      const editDepartment = state.map((department) =>
        department._id === action.data[0]._id ? action.data[0] : department
      );
      return editDepartment;
    case DELETE_DEPARTMENT_SUCCESS:
      const newDepartments = state.filter((item) => item.id !== action.data.id);
      return newDepartments;
    default:
      return state;
  }
};
