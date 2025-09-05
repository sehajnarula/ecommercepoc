import AsyncStorage from '@react-native-async-storage/async-storage';

export const CART_ADD_REQUEST = 'cart/CART_ADD_REQUEST';
export const CART_ADD_SUCCESS = 'cart/CART_ADD_SUCCESS';
export const CART_ADD_FAILURE = 'cart/CART_ADD_FAILURE';

const cartAddRequest = () => ({ type: CART_ADD_REQUEST });

const cartAddSuccess = cart => ({
  type: CART_ADD_SUCCESS,
  payload: cart,
});

const cartAddFailure = error => ({
  type: CART_ADD_FAILURE,
  payload: error,
});

export const addItemsInCart =
  (id, name, sku, units, selling_price) => async dispatch => {
    dispatch(cartAddRequest());
    try {
      const savedCartStorage = await AsyncStorage.getItem('saveditemsincart');
      const savedCart = savedCartStorage ? JSON.parse(savedCartStorage) : [];

      const updatedCartArray = [
        ...savedCart,
        {
          id,
          name,
          sku,
          units,
          selling_price,
        },
      ];

      await AsyncStorage.setItem(
        'saveditemsincart',
        JSON.stringify(updatedCartArray),
      );
      const cart = {
        id: id,
        name: name,
        sku: sku,
        units: units,
        selling_price: selling_price,
      };
      console.log('showsavedarray', updatedCartArray);
      dispatch(cartAddSuccess(cart));
    } catch (error) {
      dispatch(cartAddFailure(error));
      console.log('cartlocalfail', error);
    }
  };
