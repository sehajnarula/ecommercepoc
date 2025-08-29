import {configureStore,combineReducers} from '@reduxjs/toolkit';
import UserReducer from '../reducer/UserReducer';

const reducerCombined = combineReducers({
    user: UserReducer,
  });

const Store = configureStore({
  reducer: reducerCombined,     //thunk middleware included already
});

export default Store;