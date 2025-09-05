import {
  SHIPROCKET_ADD_ORDER_FAILURE,
  SHIPROCKET_ADD_ORDER_REQUEST,
  SHIPROCKET_ADD_ORDER_SUCCESS,
  SHIPROCKET_AUTH_FAILURE,
  SHIPROCKET_AUTH_REQUEST,
  SHIPROCKET_AUTH_SUCCESS,
} from '../actions/ShipRocketActions';

const initialShipRocketState = {
  token: null,
  order: null,
  error: null,
};

export default function ShipRocketReducer(
  state = initialShipRocketState,
  action,
) {
  switch (action.type) {
    case SHIPROCKET_AUTH_REQUEST:
      return { ...state, error: null };
    case SHIPROCKET_AUTH_SUCCESS:
      return { ...state, token: action.payload, error: null };
    case SHIPROCKET_AUTH_FAILURE:
      return { ...state, error: action.payload };
    case SHIPROCKET_ADD_ORDER_REQUEST:
      return { ...state, error: null };
    case SHIPROCKET_ADD_ORDER_SUCCESS:
      return { ...state, order: action.payload, error: null };
    case SHIPROCKET_ADD_ORDER_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
