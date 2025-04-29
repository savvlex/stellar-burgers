import { feedMockPayload } from './data/feedMock'
import { feedReducer, fetchFeed, initialState } from '../src/services/slices/feedSlice';

describe('feedReducer lifecycle simulation', () => {
  let state: typeof initialState;

  beforeAll(() => {
    state = structuredClone(initialState);
  });

  it('should handle fetchFeed.pending', () => {
    const action = fetchFeed.pending('', undefined);
    state = feedReducer(state, action);
    expect(state.isLoading).toBe(true);
    expect(state.errorMessage).toBeNull();
  });

  it('should handle fetchFeed.fulfilled', () => {
    const action = fetchFeed.fulfilled(feedMockPayload, '', undefined);
    state = feedReducer(state, action);
    expect(state.isLoading).toBe(false);
    expect(state.list).toEqual(feedMockPayload.orders);
  });

  it('should handle fetchFeed.rejected', () => {
    const error = new Error('Server error');
    const action = fetchFeed.rejected(error, '', undefined);
    state = feedReducer(state, action);
    expect(state.isLoading).toBe(false);
    expect(state.errorMessage).toBe('Server error');
  });
});


describe('feed selectors', () => {
  
})
