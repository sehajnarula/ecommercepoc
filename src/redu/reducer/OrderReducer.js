import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
} from '../actions/OrderActions';

const initialOrderState = {
  order: null,
  error: null,
};

export default function OrderReducer(state = initialOrderState, action) {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { ...state, error: null };
    case CREATE_ORDER_SUCCESS:
      return { ...state, order: action.payload, error: null };
    case CREATE_ORDER_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
