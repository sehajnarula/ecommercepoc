import { combineReducers, configureStore } from '@reduxjs/toolkit';
import CartReducer from '../reducer/CartReducer';
import ShipRocketReducer from '../reducer/ShipRocketReducer';
import UserReducer from '../reducer/UserReducer';

const reducerCombined = combineReducers({
  user: UserReducer,
  shiprocket: ShipRocketReducer,
  cart: CartReducer,
});

const Store = configureStore({
  reducer: reducerCombined, //thunk middleware included already
});

export default Store;
