import { describe, it, expect, beforeEach } from "@jest/globals";
import { initialState, TState, registerThunk, loginThunk, userReducer, fetchUser, updateProfile, logOut } from '../src/services/slices/userSlice'
import { mockRegisterData, mockLoginData, mockUser, mockUpdatedUser } from "./data/usersMock";

describe('userSlice lifecycle register testing', () => {
    let state: TState
    beforeEach(() => {
        state = structuredClone(initialState)
    })

    it('should correctly handle registerThunk.pending', () => {
        const action = registerThunk.pending('', undefined)
        state = userReducer(state, action)
        expect(state.isLoading).toBe(true)
        expect(state.errorMessage).toBe(null)
    })

    it('should correctly handle registerThunk.fullfilled', () => {
        const action = registerThunk.fulfilled(mockRegisterData, '', undefined)
        state = userReducer(state, action)
        expect(state.isLoading).toBe(false)
        expect(state.currentUser).toEqual(mockRegisterData)
        expect(state.auth).toBe(true)
        expect(state.authChecked).toBe(true)
    })
    it('should correctly handle registerThunk.rejected', () => {
        const error = Error('Internal Galaxy error')
        const action = registerThunk.rejected(error, '', undefined)
        state = userReducer(state, action)
        expect(state.isLoading).toBe(false)
        expect(state.errorMessage).toEqual(error.message)
    })
})

describe('userSlice lifecycle login testing', () => {
    let state: TState
    beforeEach(() => {
        state = structuredClone(initialState)
    })

    it('should correctly handle loginThunk.pending', () => {
        const action = loginThunk.pending('', undefined)
        state = userReducer(state, action)
        expect(state.isLoading).toBe(true)
        expect(state.errorMessage).toBe(null)
    })

    it('should correctly handle loginThunk.fullfilled', () => {
        const action = loginThunk.fulfilled(mockLoginData, '', undefined)
        state = userReducer(state, action)
        expect(state.isLoading).toBe(false)
        expect(state.currentUser).toEqual(mockLoginData)
        expect(state.auth).toBe(true)
        expect(state.authChecked).toBe(true)
    })
    it('should correctly handle loginThunk.rejected', () => {
        const error = Error('Internal Galaxy error')
        const action = loginThunk.rejected(error, '', undefined)
        state = userReducer(state, action)
        expect(state.isLoading).toBe(false)
        expect(state.errorMessage).toEqual(error.message)
    })
})


describe('userSlice lifecycle fetchUser testing', () => {
    let state: TState;
  
    beforeEach(() => {
      state = structuredClone(initialState);
    });
  
    it('should correctly handle fetchUser.pending', () => {
      const action = fetchUser.pending('', undefined);
      state = userReducer(state, action);
      expect(state.isLoading).toBe(true);
      expect(state.errorMessage).toBe(null);
    });
  
    it('should correctly handle fetchUser.fulfilled', () => {
      const action = fetchUser.fulfilled({user: mockUser}, '', undefined);
      state = userReducer(state, action);
      expect(state.isLoading).toBe(false);
      expect(state.currentUser).toEqual(mockUser);
      expect(state.auth).toBe(true);
      expect(state.authChecked).toBe(true);
    });
  
    it('should correctly handle fetchUser.rejected', () => {
      const error = new Error('Unable to fetch user');
      const action = fetchUser.rejected(error, '', undefined);
      state = userReducer(state, action);
      expect(state.isLoading).toBe(false);
      expect(state.errorMessage).toEqual(error.message);
    });
  });


describe('userSlice lifecycle updateProfile testing', () => {
  let state: TState;

  beforeEach(() => {
    state = structuredClone(initialState);
  });

  it('should correctly handle updateProfile.pending', () => {
    const action = updateProfile.pending('', undefined);
    state = userReducer(state, action);
    expect(state.isLoading).toBe(true);
    expect(state.errorMessage).toBe(null);
  });

  it('should correctly handle updateProfile.fulfilled', () => {
    state.currentUser = mockUser;
    const action = updateProfile.fulfilled(mockUpdatedUser, '', undefined);
    state = userReducer(state, action);
    expect(state.isLoading).toBe(false);
    expect(state.currentUser).toEqual(mockUpdatedUser);
  });
  

  it('should correctly handle updateProfile.rejected', () => {
    const error = new Error('Update failed');
    const action = updateProfile.rejected(error, '', undefined);
    state = userReducer(state, action);
    expect(state.isLoading).toBe(false);
    expect(state.errorMessage).toEqual(error.message);
  });
});


describe('userSlice lifecycle logOut testing', () => {
  let state: TState;

  beforeEach(() => {
    state = {
      ...initialState,
      currentUser: { name: 'Test', email: 'test@test.com' },
      auth: true,
      authChecked: true
    };
  });

  it('should correctly handle logOut.pending', () => {
    const action = logOut.pending('', undefined);
    state = userReducer(state, action);
    expect(state.isLoading).toBe(true);
    expect(state.errorMessage).toBe(null);
  });

  it('should correctly handle logOut.fulfilled', () => {
    const action = logOut.fulfilled(undefined, '', undefined);
    state = userReducer(state, action);
    expect(state.currentUser).toBeNull();
    expect(state.auth).toBe(false);
    expect(state.authChecked).toBe(false);
    expect(state.isLoading).toBe(false);
  });

  it('should correctly handle logOut.rejected', () => {
    const error = new Error('Logout error');
    const action = logOut.rejected(error, '', undefined);
    state = userReducer(state, action);
    expect(state.isLoading).toBe(false);
    expect(state.errorMessage).toEqual(error.message);
  });
});
