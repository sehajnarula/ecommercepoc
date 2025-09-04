export const GET_PRODUCTS_REQUEST = 'product/GET_PRODUCT_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'product/GET_PRODUCT_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'product/GET_PRODUCT_FAILURE';

export const ADD_PRODUCTS_FAVOURITE_REQUEST =
  'product/ADD_PRODUCTS_FAVOURITE_REQUEST';
export const ADD_PRODUCTS_FAVOURITE_SUCCESS =
  'product/ADD_PRODUCTS_FAVOURITE_SUCCESS';
export const ADD_PRODUCTS_FAVOURITE_FAILURE = 'product/GET_PRODUCT_FAILURE';

const baseUrl = `https://shoping-sk37.onrender.com/`;

const getProductsRequest = () => ({ type: GET_PRODUCTS_REQUEST });

const addProductsFavouriteRequest = () => ({
  type: ADD_PRODUCTS_FAVOURITE_REQUEST,
});
