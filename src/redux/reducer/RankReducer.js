import {
  CREATE_RANK_SUCCESS,
  DELETE_RANK_SUCCESS,
  EDIT_RANK_SUCCESS,
  GET_ALL_RANK_SUCCESS,
  GET_RANK_BY_ID_SUCCESS,
} from "../type/Rank";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_RANK_SUCCESS:
      return action.data;
    case GET_RANK_BY_ID_SUCCESS:
      let rank = action.data;
      return rank;
    case CREATE_RANK_SUCCESS:
      return [...state, action.data];
    case EDIT_RANK_SUCCESS:
      let editRank = state.map((rank) =>
        rank._id === action.data._id ? action.data : rank
      );
      return editRank;
    case DELETE_RANK_SUCCESS:
      let deleteRank = state.filter((item) => item._id !== action.data._id);
      return deleteRank;
    default:
      return state;
  }
};
