import {
  CREATE_POSITION_SUCCESS,
  DELETE_POSITION_SUCCESS,
  EDIT_POSITION_SUCCESS,
  GET_ALL_POSITION_SUCCESS,
} from "../type/Rank";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_POSITION_SUCCESS:
      return action.data;
    case CREATE_POSITION_SUCCESS:
      return [...state, action.data];
    case EDIT_POSITION_SUCCESS:
      let editRank = state.map((item) =>
        item._id === action.data._id ? action.data : item
      );
      return editRank;
    case DELETE_POSITION_SUCCESS:
      let deleteRank = state.filter((item) => item._id !== action.data._id);
      return deleteRank;
    default:
      return state;
  }
};
