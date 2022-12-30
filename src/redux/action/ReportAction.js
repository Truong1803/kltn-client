import {
  GET_REPORT_BY_ACCOUNTING_SUCCESS,
  GET_REPORT_BY_DEPARTMENT_SUCCESS,
  GET_REPORT_BY_LECTURER_SUCCESS,
  GET_REPORT_BY_RESEARCH_SUCCESS,
  GET_REPORT_BY_SUBJECT_SUCCESS,
  GET_REPORT_BY_USER_SUCCESS,
} from "../type/ReportType";
import { GET } from "../../Api/Config";
import { SHOW_NOTIFICATION } from "../type/Alert";
export const getALLTotalResearchAction =
  (semesterId, token) => async (dispatch) => {
    try {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "loading" },
      });
      const resp = await GET(`report/nckh?semester_id=${semesterId}`, token);
      dispatch({
        type: GET_REPORT_BY_RESEARCH_SUCCESS,
        data: resp.data,
      });
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "success" },
      });
    } catch (error) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "error", message: error.response.data.msg },
      });
    }
  };
export const getReportByDepartmentAction =
  (year, token) => async (dispatch) => {
    try {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "loading" },
      });
      const resp = await GET(`report/department?year=${year}`, token);
      dispatch({
        type: GET_REPORT_BY_DEPARTMENT_SUCCESS,
        data: resp.data.data,
      });
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "success" },
      });
    } catch (error) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "error", message: error.response.data.msg },
      });
    }
  };
export const getReportBySubjectAction = (year, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    const resp = await GET(`report/bm?year=${year}`, token);
    dispatch({
      type: GET_REPORT_BY_SUBJECT_SUCCESS,
      data: resp.data,
    });
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "success" },
    });
  } catch (error) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "error", message: error.response.data.msg },
    });
  }
};

export const getReportByUserAction = (year, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    const resp = await GET(`report/user?year=${year}`, token);
    dispatch({
      type: GET_REPORT_BY_USER_SUCCESS,
      data: resp.data.result,
    });
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "success" },
    });
  } catch (error) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "error", message: error.response.data.msg },
    });
  }
};
export const getReportByAccountingAction =
  (subject_id, department_id, semester_id, reward_id, token) =>
  async (dispatch) => {
    try {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "loading" },
      });
      const resp = await GET(
        `report/tv?subject_id=${subject_id}&department_id=${department_id}&semester_id=${semester_id}&reward_id=${reward_id}`,
        token
      );
      dispatch({
        type: GET_REPORT_BY_ACCOUNTING_SUCCESS,
        data: resp.data.data,
      });
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "success" },
      });
    } catch (error) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "error", message: error.response.data.msg },
      });
    }
  };
export const getReportByLecturerAction =
  (option, year, token) => async (dispatch) => {
    try {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "loading" },
      });
      const resp = await GET(
        `report/time-user?case=${option}&year=${year}`,
        token
      );
      dispatch({
        type: GET_REPORT_BY_LECTURER_SUCCESS,
        data: resp.data.data,
      });
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "success" },
      });
    } catch (error) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "error", message: error.response.data.msg },
      });
    }
  };
