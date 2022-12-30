import { DELETE, GET, POST, PUT } from "../../Api/Config";
import { SHOW_NOTIFICATION } from "../type/Alert";
import {
  CREATE_RANK_SUCCESS,
  DELETE_RANK_SUCCESS,
  EDIT_RANK_SUCCESS,
  GET_ALL_RANK_SUCCESS,
  GET_RANK_BY_ID_SUCCESS,
} from "../type/Rank";

export const getALLRankAction = (token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    const resp = await GET("rank", token);
    dispatch({
      type: GET_ALL_RANK_SUCCESS,
      data: resp.data.ranks,
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

export const createRankAction = (body, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    const resp = await POST(`rank`, body, token);
    dispatch({
      type: CREATE_RANK_SUCCESS,
      data: resp.data.newRank,
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
export const editRankAction = (body, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });

    const resp = await PUT(`rank/${body._id}`, body, token);
    dispatch({
      type: EDIT_RANK_SUCCESS,
      data: resp.data.updateRank,
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
export const deleteRankAction = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    const resp = await DELETE(`rank/${id}`, token);
    dispatch({
      type: DELETE_RANK_SUCCESS,
      data: resp.data.deleteRank,
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
export const getRankByIDAction = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { status: "loading" },
    });
    const resp = await GET(`rank/${id}`, token);
    dispatch({
      type: GET_RANK_BY_ID_SUCCESS,
      data: resp.data.rank,
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
