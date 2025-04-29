import { describe, it, expect, beforeEach } from "@jest/globals";
import { rootReducer, type RootState } from "../src/services/rootReducer";
import { initialState as ingredientsState } from "../src/services/slices/ingredientSlice";
import { initialState as userState } from "../src/services/slices/userSlice";
import { initialState as burgerState } from "../src/services/slices/burgerConstructorSlice";
import { initialState as orderState } from "../src/services/slices/orderSlice";
import { initialState as feedState } from "../src/services/slices/feedSlice";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";

let store: EnhancedStore<RootState>;
let state: RootState;

describe("rootReducer", () => {

  beforeEach(() => {
    store = configureStore({ reducer: rootReducer });
    state = store.getState();
  });

  it("should initialize the ingredients state correctly", () => {
    expect(state.ingredients).toEqual(ingredientsState);
  });

  it("should initialize the user state correctly", () => {
    expect(state.user).toEqual(userState);
  });

  it("should initialize the constructorBurger state correctly", () => {
    expect(state.constructorBurger).toEqual(burgerState);
  });
  it("should initialize the order state correctly", () => {
    expect(state.order).toEqual(orderState);
  });
  it("should initialize the feed state correctly", () => {
    expect(state.feed).toEqual(feedState);
  });
});
