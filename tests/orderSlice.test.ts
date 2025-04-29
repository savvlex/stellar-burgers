import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  initialState,
  orderReducer,
  getOrders,
  getOrderNumber,
  postOrderBurger,
  clearOrder,
  type TOrderState
} from '../src/services/slices/orderSlice';
import { mockOrder, mockOrderList } from './data/orderMock';

describe('orderSlice lifecycle', () => {
  let state: TOrderState;

  beforeEach(() => {
    state = structuredClone(initialState);
  });

  // ---------- GET ORDERS ----------
  it('should handle getOrders.pending', () => {
    const action = getOrders.pending('', undefined);
    state = orderReducer(state, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle getOrders.fulfilled', () => {
    const action = getOrders.fulfilled(mockOrderList, '', undefined);
    state = orderReducer(state, action);
    expect(state.loading).toBe(false);
    expect(state.orderList).toEqual(mockOrderList);
  });

  it('should handle getOrders.rejected', () => {
    const error = new Error('Failed to load');
    const action = getOrders.rejected(error, '', undefined);
    state = orderReducer(state, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error.message);
  });

  // ---------- GET ORDER BY NUMBER ----------
  it('should handle getOrderNumber.pending', () => {
    const action = getOrderNumber.pending('', 42);
    state = orderReducer(state, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle getOrderNumber.fulfilled', () => {
    const action = getOrderNumber.fulfilled({ orders: [mockOrder] }, '', 42);
    state = orderReducer(state, action);
    expect(state.loading).toBe(false);
    expect(state.order).toEqual(mockOrder);
  });

  it('should handle getOrderNumber.rejected', () => {
    const error = new Error('Order not found');
    const action = getOrderNumber.rejected(error, '', 42);
    state = orderReducer(state, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error.message);
  });

  // ---------- POST ORDER BURGER ----------
  it('should handle postOrderBurger.pending', () => {
    const action = postOrderBurger.pending('', ['ingredient1']);
    state = orderReducer(state, action);
    expect(state.loading).toBe(true);
    expect(state.orderState).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle postOrderBurger.fulfilled', () => {
    const action = postOrderBurger.fulfilled({ order: mockOrder }, '', ['ingredient1']);
    state = orderReducer(state, action);
    expect(state.loading).toBe(false);
    expect(state.orderState).toBe(false);
    expect(state.order).toEqual(mockOrder);
    expect(state.orderList).toContainEqual(mockOrder);
  });

  it('should handle postOrderBurger.rejected', () => {
    const error = new Error('Burger error');
    const action = postOrderBurger.rejected(error, '', ['ingredient1']);
    state = orderReducer(state, action);
    expect(state.loading).toBe(false);
    expect(state.orderState).toBe(false);
    expect(state.error).toBe(error.message);
  });

  // ---------- CLEAR ----------
  it('should handle clearOrder reducer', () => {
    state.order = mockOrder;
    const clearedState = orderReducer(state, clearOrder());
    expect(clearedState.order).toBeNull();
  });
});
