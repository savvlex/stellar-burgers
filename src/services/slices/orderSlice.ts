import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  orderList: TOrder[];
  order: TOrder | null;
  orderState: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orderList: [],
  order: null,
  orderState: false,
  loading: false,
  error: null
};

export const getOrders = createAsyncThunk(
  'order/getOrders',
  async () => await getOrdersApi()
);

export const getOrderNumber = createAsyncThunk(
  'order/getOrderNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

export const postOrderBurger = createAsyncThunk(
  'order/postOrderBurger',
  async (ingredients: string[]) => await orderBurgerApi(ingredients)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder(state) {
      state.order = null;
    }
  },
  selectors: {
    orderListSelector: (state) => state.orderList,
    orderSelector: (state) => state.order,
    orderStateSelector: (state) => state.orderState
  },
  extraReducers(builder) {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orderList = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })

      .addCase(getOrderNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.orders[0];
      })
      .addCase(getOrderNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })

      .addCase(postOrderBurger.pending, (state) => {
        state.loading = true;
        state.orderState = true;
        state.error = null;
      })
      .addCase(postOrderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.orderState = false;
        state.order = action.payload.order;
        state.orderList.push(action.payload.order);
      })
      .addCase(postOrderBurger.rejected, (state, action) => {
        state.loading = false;
        state.orderState = false;
        state.error = action.error.message ?? null;
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;

export const { orderListSelector, orderSelector, orderStateSelector } =
  orderSlice.selectors;
