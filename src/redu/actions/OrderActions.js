import axios from 'axios';
import keys from '../../constants/keys';

export const CREATE_ORDER_REQUEST = 'order/CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'order/CREATE_ORDER_REQUEST';
export const CREATE_ORDER_FAILURE = 'order/CREATE_ORDER_REQUEST';

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

const createOrderRequest = () => ({
  type: CREATE_ORDER_REQUEST,
});

const createOrderSuccess = order => ({
  type: CREATE_ORDER_SUCCESS,
  payload: order,
});

const createOrderFailure = error => ({
  type: CREATE_ORDER_FAILURE,
  payload: formatError(error),
});

export const createOrderApiCall = (token, orderDetails) => async dispatch => {
  dispatch(createOrderRequest());
  try {
    const response = await axios.post(
      `${keys.appApiBaseUrl}api/orders`,
      orderDetails,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const responseData = response.data;
    dispatch(createOrderSuccess(responseData));
  } catch (error) {
    dispatch(createOrderFailure(error));
    console.log('showcreateorderapierror', error);
  }
};
