import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TState = {
  list: TIngredient[];
  isLoading: boolean;
  fetchError: string | null;
};

const initialState: TState = {
  list: [],
  isLoading: false,
  fetchError: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  getIngredientsApi
);

const slice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.list,
    selectIngredientsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchError = action.error.message ?? null;
      });
  }
});

export const { selectIngredients, selectIngredientsLoading } = slice.selectors;

export const ingredientsReducer = slice.reducer;
