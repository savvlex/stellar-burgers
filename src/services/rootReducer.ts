import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { ingredientsReducer } from './slices/ingredientSlice';
import { burgerConstructorReducer } from './slices/burgerConstructorSlice';
import { orderReducer } from './slices/orderSlice';
import { feedReducer } from './slices/feedSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  constructorBurger: burgerConstructorReducer,
  order: orderReducer,
  feed: feedReducer
});
