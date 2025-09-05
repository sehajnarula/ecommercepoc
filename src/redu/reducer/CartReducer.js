import {
  CART_ADD_FAILURE,
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
} from '../actions/CartActions';

const initialCartState = {
  cart: [],
  error: null,
};

export default function CartReducer(state = initialCartState, action) {
  switch (action.type) {
    case CART_ADD_REQUEST:
      return { ...state, error: null };
    case CART_ADD_SUCCESS:
      return {
        ...state,
        cart: [...state.cart, action.payload],
        error: null,
      };
    case CART_ADD_FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}
