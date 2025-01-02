import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IAuthPayload, IInitialState } from './types';
import UserService from 'shared/api/typicode/users';
import { AuthResponse } from 'shared/api';
import { API_URL } from 'shared/config';
import axios from 'axios';

const initialState: IInitialState = {
  user: {
    id: null,
    email: null,
    password: null,
  },
  isAuth: false,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    auth: (state, action: PayloadAction<IAuthPayload>) => {
      state.user = { ...action.payload };
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = {
        id: null,
        email: null,
        password: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registration.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuth = true;
        state.user = action.payload;
      }
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuth = true;
        state.user = action.payload;
      }
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.isAuth = false;
      state.user.email = null;
      state.user.id = null;
      state.user.password = null;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuth = true;
        state.user = action.payload;
      }
    });
  },
});
export const { auth, logout } = authSlice.actions;
export const reducer = authSlice.reducer;

export const login = createAsyncThunk('user/login', async (data: IAuthPayload, { rejectWithValue }) => {
  try {
    const response = await UserService.login(data.email, data.password);
    localStorage.setItem('token', response.data.accessToken);
    return response.data.user;
  } catch (e: any) {
    if (e.response) {
      return rejectWithValue(e.response?.data?.message);
    } else {
      return rejectWithValue(e.message);
    }
  }
});
export const registration = createAsyncThunk('user/registration', async (data: IAuthPayload, { rejectWithValue }) => {
  try {
    const response = await UserService.registration(data.email, data.password);
    localStorage.setItem('token', response.data.accessToken);
    return response.data.user;
  } catch (e: any) {
    if (e.response) {
      return rejectWithValue(e.response?.data?.message);
    } else {
      return rejectWithValue(e.message);
    }
  }
});
export const logoutAction = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await UserService.logout();
    localStorage.removeItem('token');
  } catch (e: any) {
    if (e.response) {
      return rejectWithValue(e.response?.data?.message);
    } else {
      return rejectWithValue(e.message);
    }
  }
});
export const checkAuth = createAsyncThunk('user/checkAuth', async () => {
  try {
    const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
    localStorage.setItem('token', response.data.accessToken);
    return response.data.user;
  } catch (e) {
    console.log(e);
  }
});
