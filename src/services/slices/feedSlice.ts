import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

type TFeedModule = {
  list: TOrder[];
  countTotal: number;
  countToday: number;
  isLoading: boolean;
  errorMessage: string | null;
};

const defaultFeedState: TFeedModule = {
  list: [],
  countTotal: 0,
  countToday: 0,
  isLoading: false,
  errorMessage: null
};

export const fetchFeed = createAsyncThunk('feed/fetchFeed', getFeedsApi);

const feedModule = createSlice({
  name: 'feed',
  initialState: defaultFeedState,
  reducers: {},
  selectors: {
    selectFeedList: (state) => state.list,
    selectFeedTotal: (state) => state.countTotal,
    selectFeedToday: (state) => state.countToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload.orders;
        state.countTotal = action.payload.total;
        state.countToday = action.payload.totalToday;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message ?? null;
      });
  }
});

export const { selectFeedList, selectFeedTotal, selectFeedToday } =
  feedModule.selectors;

export const feedReducer = feedModule.reducer;
