import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IInitialState, IResponsePayload } from './types';
import { AppDispatch } from 'shared/lib/types';
import { fetchFilmById, fetchFilms, fetchRangeFilms } from 'entities/film';
import { login, registration } from 'entities/user';

const initialState: IInitialState = {
  answer: '',
  isError: false,
  isFetching: false,
  isSuccess: false,
};
export const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    fetching: (state) => {
      state.answer = '';
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = true;
    },
    fetchingStop: (state, payload: PayloadAction<IResponsePayload>) => {
      state.answer = payload.payload.answer;
      state.isError = payload.payload.isError;
      state.isSuccess = payload.payload.isSuccess;
      state.isFetching = false;
    },
    fetchingClear: (state) => {
      state.answer = '';
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmById.pending, (state) => {
        state.answer = '';
        state.isError = false;
        state.isSuccess = false;
        state.isFetching = true;
      })
      .addCase(fetchFilmById.fulfilled, (state) => {
        state.answer = 'Фильм получен';
        state.isError = false;
        state.isSuccess = true;
        state.isFetching = false;
      })
      .addCase(fetchFilmById.rejected, (state, action) => {
        state.answer = action.payload + '' || 'Что-то пошло не так';
        state.isError = true;
        state.isSuccess = false;
        state.isFetching = false;
      });
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.answer = '';
        state.isError = false;
        state.isSuccess = false;
        state.isFetching = true;
      })
      .addCase(fetchFilms.fulfilled, (state) => {
        state.answer = 'Фильмы получены';
        state.isError = false;
        state.isSuccess = true;
        state.isFetching = false;
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.answer = action.payload + '' || 'Что-то пошло не так';
        state.isError = true;
        state.isSuccess = false;
        state.isFetching = false;
      });
    builder
      .addCase(fetchRangeFilms.pending, (state) => {
        state.answer = '';
        state.isError = false;
        state.isSuccess = false;
        state.isFetching = true;
      })
      .addCase(fetchRangeFilms.fulfilled, (state) => {
        state.answer = 'Фильмы получены';
        state.isError = false;
        state.isSuccess = true;
        state.isFetching = false;
      })
      .addCase(fetchRangeFilms.rejected, (state, action) => {
        state.answer = action.payload + '' || 'Что-то пошло не так';
        state.isError = true;
        state.isSuccess = false;
        state.isFetching = false;
      });
    builder
      .addCase(registration.pending, (state) => {
        state.answer = '';
        state.isError = false;
        state.isSuccess = false;
        state.isFetching = true;
      })
      .addCase(registration.fulfilled, (state) => {
        state.answer = 'Регистрация и вход прошли успешно';
        state.isError = false;
        state.isSuccess = true;
        state.isFetching = false;
      })
      .addCase(registration.rejected, (state, action) => {
        state.answer = action.payload + '' || 'Что-то пошло не так';
        state.isError = true;
        state.isSuccess = false;
        state.isFetching = false;
      });
    builder
      .addCase(login.pending, (state) => {
        state.answer = '';
        state.isError = false;
        state.isSuccess = false;
        state.isFetching = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.answer = 'Вход прошел успешно';
        state.isError = false;
        state.isSuccess = true;
        state.isFetching = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.answer = action.payload + '' || 'Что-то пошло не так';
        state.isError = true;
        state.isSuccess = false;
        state.isFetching = false;
      });
  },
});
export const reducer = responseSlice.reducer;

export const clearResponse = (dispatch: AppDispatch) => {
  const { fetchingClear } = responseSlice.actions;
  dispatch(fetchingClear());
};
