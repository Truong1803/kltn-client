import {
  ACTION_RESEARCH_SUCCESS,
  CREATE_RESEARCH_SUCCESS,
  DELETE_RESEARCH_SUCCESS,
  EDIT_RESEARCH_SUCCESS,
  GET_ALL_RESEARCH_SUCCESS,
  GET_RESEARCH_BY_ID_SUCCESS,
  GET_RESEARCH_BY_USER_ID_SUCCESS,
} from "../type/Research";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_RESEARCH_SUCCESS:
      return action.data;
    case GET_RESEARCH_BY_ID_SUCCESS:
      return action.data;
    case GET_RESEARCH_BY_USER_ID_SUCCESS:
      return action.data;
    case CREATE_RESEARCH_SUCCESS:
      const createResearch = action.data;
      return createResearch;
    case EDIT_RESEARCH_SUCCESS:
      let editResearch = state.map((item) =>
        item._id === action.data._id ? action.data : item
      );
      return editResearch;
    case ACTION_RESEARCH_SUCCESS:
      let actionResearch = state.filter((item) => item._id !== action.data._id);
      return actionResearch;

    case DELETE_RESEARCH_SUCCESS:
      let deleteResearch = state.filter((item) => item._id !== action.data._id);
      return deleteResearch;
    default:
      return state;
  }
};
