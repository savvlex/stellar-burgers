import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { TUser } from '@utils-types';

type TState = {
  currentUser: TUser | null;
  isLoading: boolean;
  errorMessage: string | null;
  auth: boolean;
  authChecked: boolean;
};

const initialState: TState = {
  currentUser: null,
  isLoading: false,
  errorMessage: null,
  auth: false,
  authChecked: false
};

export const registerThunk = createAsyncThunk(
  'user/register',
  async (payload: TRegisterData, { rejectWithValue }) => {
    const response = await registerUserApi(payload);
    if (!response.success) return rejectWithValue(response);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const loginThunk = createAsyncThunk(
  'user/login',
  async (payload: TLoginData, { rejectWithValue }) => {
    const response = await loginUserApi(payload);
    if (!response.success) return rejectWithValue(response);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const fetchUser = createAsyncThunk('user/fetchUser', getUserApi);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (form: Partial<TRegisterData>, { rejectWithValue }) => {
    const result = await updateUserApi(form);
    if (!result.success) return rejectWithValue(result);
    return result.user;
  }
);

export const logOut = createAsyncThunk(
  'user/logOut',
  async (_, { rejectWithValue }) => {
    const result = await logoutApi();
    if (!result.success) return rejectWithValue(result);
    deleteCookie('accessToken');
    localStorage.clear();
  }
);

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    userDataSelector: (state) => state.currentUser,
    isAuthCheckedSelector: (state) => state.authChecked,
    authenticatedSelector: (state) => state.auth
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.auth = true;
        state.authChecked = true;
        state.isLoading = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message ?? null;
      })

      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.auth = true;
        state.authChecked = true;
        state.isLoading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message ?? null;
      })

      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.auth = true;
        state.authChecked = true;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message ?? null;
      })

      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message ?? null;
      })

      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.currentUser = null;
        state.auth = false;
        state.authChecked = false;
        state.isLoading = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message ?? null;
      });
  }
});

export const {
  userDataSelector,
  isAuthCheckedSelector,
  authenticatedSelector
} = slice.selectors;

export const userReducer = slice.reducer;
