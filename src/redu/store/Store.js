import { combineReducers, configureStore } from '@reduxjs/toolkit';
import CartReducer from '../reducer/CartReducer';
import OrderReducer from '../reducer/OrderReducer';
import ProductReducer from '../reducer/ProductReducer';
import ShipRocketReducer from '../reducer/ShipRocketReducer';
import UserReducer from '../reducer/UserReducer';

const reducerCombined = combineReducers({
  user: UserReducer,
  shiprocket: ShipRocketReducer,
  cart: CartReducer,
  product: ProductReducer,
  order: OrderReducer,
});

const Store = configureStore({
  reducer: reducerCombined, //thunk middleware included already
});

export default Store;
