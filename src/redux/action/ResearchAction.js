import { DELETE, GET, POST, PUT } from "../../Api/Config";
import { SHOW_NOTIFICATION } from "../type/Alert";
import {
  ACTION_RESEARCH_SUCCESS,
  CREATE_RESEARCH_SUCCESS,
  DELETE_RESEARCH_SUCCESS,
  EDIT_RESEARCH_SUCCESS,
  GET_ALL_RESEARCH_SUCCESS,
  GET_RESEARCH_BY_ID_SUCCESS,
  GET_RESEARCH_BY_USER_ID_SUCCESS,
} from "../type/Research";

export const getResearchByCaseAction =
  (
    option,
    subjectId,
    department_id,
    semester_id,
    category_research_id,
    status,
    hasStudent,
    token
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "loading" },
      });
      const resp = await GET(
        `document/?offer=${option}&subject_id=${subjectId}&department_id=${department_id}&semester_id=${semester_id}&category_research_id=${category_research_id}&status=${status}&hasStudent=${hasStudent}`,
        token
      );
      dispatch({
        type: GET_ALL_RESEARCH_SUCCESS,
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

export const createResearchAction = (body, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });

    const resp = await POST(`document/upload`, body, token);
    dispatch({
      type: CREATE_RESEARCH_SUCCESS,
      data: resp.data.newDocument,
    });
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "success", message: resp.data.msg },
    });
  } catch (error) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "error", message: error.response.data.msg },
    });
  }
};
export const editResearchAction = (body, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });

    const resp = await PUT(`document/${body._id}?case=update`, body, token);
    dispatch({
      type: EDIT_RESEARCH_SUCCESS,
      data: resp.data.documentUpdated,
    });
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "success", message: resp.data.msg },
    });
  } catch (error) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "error", message: error.response.data.msg },
    });
  }
};
export const deleteResearchAction = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    const resp = await DELETE(`document/${id}`, token);
    dispatch({
      type: DELETE_RESEARCH_SUCCESS,
      data: resp.data.data,
    });
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "success", message: resp.data.msg },
    });
  } catch (error) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "error", message: error.response.data.msg },
    });
  }
};
export const researchApproveAction = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });

    const resp = await PUT(`document/${id}?case=approve`, null, token);
    dispatch({
      type: ACTION_RESEARCH_SUCCESS,
      data: resp.data.documentApprove,
    });
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "success", message: resp.data.msg },
    });
  } catch (error) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "error", message: error.response.data.msg },
    });
  }
};
export const researchOfferAction =
  (id, request, body, token) => async (dispatch) => {
    try {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "loading" },
      });

      const resp = await PUT(`document/${id}?case=${request}`, body, token);
      dispatch({
        type: ACTION_RESEARCH_SUCCESS,
        data: resp.data.documentOffer,
      });
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "success", message: resp.data.msg },
      });
    } catch (error) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "error", message: error.response.data.msg },
      });
    }
  };
export const researchUnOfferAction =
  (id, request, body, token) => async (dispatch) => {
    try {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "loading" },
      });

      const resp = await PUT(`document/${id}?case=${request}`, body, token);
      dispatch({
        type: ACTION_RESEARCH_SUCCESS,
        data: resp.data.documentUnOffer,
      });
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "success", message: resp.data.msg },
      });
    } catch (error) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "error", message: error.response.data.msg },
      });
    }
  };
export const researchSuggestAction =
  (id, request, body, token) => async (dispatch) => {
    try {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "loading" },
      });

      const resp = await PUT(`document/${id}?case=${request}`, body, token);
      dispatch({
        type: ACTION_RESEARCH_SUCCESS,
        data: resp.data.documentPendding,
      });
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "success", message: resp.data.msg },
      });
    } catch (error) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "error", message: error.response.data.msg },
      });
    }
  };
export const paymentResearchAction =
  (id, request, body, token) => async (dispatch) => {
    try {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "loading" },
      });

      const resp = await PUT(`document/${id}?case=${request}`, body, token);
      dispatch({
        type: ACTION_RESEARCH_SUCCESS,
        data: resp.data.documentPaid,
      });
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "success", message: resp.data.msg },
      });
    } catch (error) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "error", message: error.response.data.msg },
      });
    }
  };
export const getALLResearchOfferAction =
  (
    subject_id,
    department_id,
    semester_id,
    category_research_id,
    hasStudent,
    token
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "loading" },
      });
      const resp = await GET(
        `document/?offer=offer&subject_id=${subject_id}&department_id=${department_id}&semester_id=${semester_id}&category_research_id=${category_research_id}&hasStudent=${hasStudent}`,
        token
      );
      dispatch({
        type: GET_ALL_RESEARCH_SUCCESS,
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
export const getResearchByUserIdAction = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    const resp = await GET(`document/get-by-user/${id}`, token);
    dispatch({
      type: GET_RESEARCH_BY_USER_ID_SUCCESS,
      data: resp.data.documents,
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

export const getResearchByIdAction = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    const resp = await GET(`document/${id}`, token);
    dispatch({
      type: GET_RESEARCH_BY_ID_SUCCESS,
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
