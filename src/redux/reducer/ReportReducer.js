import {
  GET_REPORT_BY_ACCOUNTING_SUCCESS,
  GET_REPORT_BY_DEPARTMENT_SUCCESS,
  GET_REPORT_BY_LECTURER_SUCCESS,
  GET_REPORT_BY_RESEARCH_SUCCESS,
  GET_REPORT_BY_SUBJECT_SUCCESS,
  GET_REPORT_BY_USER_SUCCESS,
} from "../type/ReportType";

const initialState = {
  total: {},
  byDepartment: [],
  bySubject: [],
  byUser: [],
  byAccounting: [],
  byLecturer: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_REPORT_BY_RESEARCH_SUCCESS:
      return { ...state, total: action.data };
    case GET_REPORT_BY_DEPARTMENT_SUCCESS:
      return { ...state, byDepartment: action.data };
    case GET_REPORT_BY_SUBJECT_SUCCESS:
      return { ...state, bySubject: action.data };
    case GET_REPORT_BY_USER_SUCCESS:
      return { ...state, byUser: action.data };
    case GET_REPORT_BY_ACCOUNTING_SUCCESS:
      return { ...state, byAccounting: action.data };
    case GET_REPORT_BY_LECTURER_SUCCESS:
      return { ...state, byLecturer: action.data };
    default:
      return state;
  }
};
