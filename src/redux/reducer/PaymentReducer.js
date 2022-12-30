import {
  CREATE_PAYMENT_SUCCESS,
  DELETE_PAYMENT_SUCCESS,
  EDIT_PAYMENT_SUCCESS,
  GET_ALL_PAYMENT_SUCCESS,
} from "../type/Payment";
export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_PAYMENT_SUCCESS:
      return action.data;
    case CREATE_PAYMENT_SUCCESS:
      return [...state, action.data];
    case EDIT_PAYMENT_SUCCESS:
      let editPayment = state.map((item) =>
        item._id === action.data._id ? action.data : item
      );
      return editPayment;
    case DELETE_PAYMENT_SUCCESS:
      let deletePayment = state.filter((item) => item._id !== action.data._id);

      return deletePayment;
    default:
      return state;
  }
};
