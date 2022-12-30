import { DELETE, GET, POST, PUT } from "../../Api/Config";
import { SHOW_NOTIFICATION } from "../type/Alert";
import {
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  EDIT_CATEGORY_SUCCESS,
  GET_ALL_CATEGORY_SUCCESS,
} from "../type/Category";
export const getALLCategoryResearchAction = (token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    const resp = await GET("category-research", token);
    dispatch({
      type: GET_ALL_CATEGORY_SUCCESS,
      data: resp.data.categorys,
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

export const createCategoryResearchAction =
  (body, token) => async (dispatch) => {
    try {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { status: "loading" },
      });
      const resp = await POST(`category-research`, body, token);
      dispatch({
        type: CREATE_CATEGORY_SUCCESS,
        data: resp.data.newCategory,
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
export const editCategoryResearchAction = (body, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });

    const resp = await PUT(`category-research/${body._id}`, body, token);
    dispatch({
      type: EDIT_CATEGORY_SUCCESS,
      data: resp.data.categoryResearch,
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
export const deleteCategoryResearchAction = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    const resp = await DELETE(`category-research/${id}`, token);
    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      data: resp.data.categoryResearch,
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
