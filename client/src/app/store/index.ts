import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from 'entities/user/';
import { filmApi, filmSlice } from 'entities/film/';
import { responseSlice } from 'entities/response/';
import { commentSlice } from 'entities/comment';

export const store = configureStore({
  reducer: {
    [filmApi.reducerPath]: filmApi.reducer,
    auth: authSlice.reducer,
    response: responseSlice.reducer,
    film: filmSlice.reducer,
    comment: commentSlice.reducer,
  },
  middleware: (getDefaultMidleware) => getDefaultMidleware().concat(filmApi.middleware),
});
