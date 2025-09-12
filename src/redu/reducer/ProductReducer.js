import {
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
} from '../actions/ProductActions';

const initialProductState = {
  product: {},
  error: null,
};

export default function ProductReducer(state = initialProductState, action) {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return { ...state, error: null };
    case ADD_PRODUCT_SUCCESS:
      return { ...state, product: action.payload, error: null };
    case ADD_PRODUCT_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
