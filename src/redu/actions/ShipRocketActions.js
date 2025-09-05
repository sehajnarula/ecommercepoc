import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import keys from '../../constants/keys';

export const SHIPROCKET_AUTH_REQUEST = 'shiprocket/ADD_ORDER_REQUEST';
export const SHIPROCKET_AUTH_SUCCESS = 'shiprocket/ADD_ORDER_SUCCESS';
export const SHIPROCKET_AUTH_FAILURE = 'shiprocket/ADD_ORDER_FAILURE';

export const SHIPROCKET_ADD_ORDER_REQUEST =
  'shiprocket/SHIPROCKET_ADD_ORDER_REQUEST';
export const SHIPROCKET_ADD_ORDER_SUCCESS =
  'shiprocket/SHIPROCKET_ADD_ORDER_SUCCESS';
export const SHIPROCKET_ADD_ORDER_FAILURE =
  'shiprocket/SHIPROCKET_ADD_ORDER_FAILURE';

const saveTokenLocally = async token => {
  try {
    await AsyncStorage.setItem('shiprockettoken', token);
  } catch (error) {
    console.log('showshiprockettokenlocalerror', error);
  }
};

const baseUrl = `https://apiv2.shiprocket.in/v1/external/`;

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

const shiprocketAuthRequest = () => ({ type: SHIPROCKET_AUTH_REQUEST });

const shiprocketAuthSuccess = token => {
  saveTokenLocally(token);
  return {
    type: SHIPROCKET_AUTH_SUCCESS,
    payload: token,
  };
};

const shiprocketAuthFailure = error => ({
  type: SHIPROCKET_AUTH_FAILURE,
  payload: formatError(error),
});

const shiprocketAddOrderRequest = () => ({
  type: SHIPROCKET_ADD_ORDER_REQUEST,
});

const shiprocketAddOrderSuccess = order => {
  return { type: SHIPROCKET_ADD_ORDER_SUCCESS, payload: order };
};

const shiprocketAddOrderFailure = error => ({
  type: SHIPROCKET_ADD_ORDER_FAILURE,
  payload: formatError(error),
});

export const shiprocketAuthCall = () => async dispatch => {
  dispatch(shiprocketAuthRequest());
  try {
    const response = await axios.post(`${baseUrl}auth/login`, {
      email: keys.shipRocketAuthEmail,
      password: keys.shipRocketAuthPassword,
    });
    const authToken = response.data.token;
    dispatch(shiprocketAuthSuccess(authToken));
    console.log('showtokeninshiprocketapi', authToken);
  } catch (error) {
    dispatch(shiprocketAuthFailure(error));
    console.log('shiprocketauthapicallerror', error);
  }
};

export const shiprocketAddOrderApiCall = (token, order) => async dispatch => {
  dispatch(shiprocketAddOrderRequest());
  try {
    const response = await axios.post(`${baseUrl}orders/create/adhoc`, order, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = response.data;
    dispatch(shiprocketAddOrderSuccess(responseData));
    console.log('showapicallsuccessresponse', responseData);
  } catch (error) {
    dispatch(shiprocketAddOrderFailure(error));
    console.log('placeorderapicallerror', error);
  }
};
