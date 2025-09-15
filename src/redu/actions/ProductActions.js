import axios from 'axios';
import keys from '../../constants/keys';

export const GET_PRODUCTS_REQUEST = 'product/GET_PRODUCT_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'product/GET_PRODUCT_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'product/GET_PRODUCT_FAILURE';

export const ADD_PRODUCT_REQUEST = 'product/ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'product/ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'product/ADD_PRODUCT_FAILURE';

const formatError = error => {
  let code = 'UNKNOWN_ERROR';
  let message = 'Something went wrong';

  try {
    if (error) {
      if (typeof error === 'object') {
        code = error.code ?? 'UNKNOWN_ERROR';
        message = error.message ?? JSON.stringify(error);
      } else {
        message = String(error);
      }
    }
  } catch (e) {
    console.log('error-formatting-failed', e);
  }

  return { code, message };
};

const getProductsRequest = () => ({ type: GET_PRODUCTS_REQUEST });

const addProductRequest = () => ({
  type: ADD_PRODUCT_REQUEST,
});

const addProductSuccess = product => {
  return { type: ADD_PRODUCT_SUCCESS, payload: product };
};

const addProductFailure = error => ({
  type: ADD_PRODUCT_FAILURE,
  payload: formatError(error),
});

export const addProductByAdmin = (token, productInfo) => async dispatch => {
  dispatch(addProductRequest());
  try {
    const response = await axios.post(
      `${keys.appApiBaseUrl}api/products`,
      productInfo,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const responseData = response.data;
    dispatch(addProductSuccess(responseData));
  } catch (error) {
    dispatch(addProductFailure(error));
  }
};
