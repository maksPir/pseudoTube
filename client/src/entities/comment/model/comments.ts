import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from 'shared/lib/types';
import { responseSlice } from 'entities/response';
import { IComment } from 'shared/api';
import CommentService from 'shared/api/typicode/comments';

const initialState: { comments: IComment[] } = {
  comments: [] as IComment[],
};
export const commentSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {
    setComments: (state, action: PayloadAction<IComment[]>) => {
      state.comments = action.payload;
    },
  },
});

export const fetchCommentsById = async (dispatch: AppDispatch, filmId: number) => {
  const { fetching, fetchingStop } = responseSlice.actions;
  const { setComments } = commentSlice.actions;
  try {
    dispatch(fetching());
    const response = await CommentService.getById(filmId);
    dispatch(fetchingStop({ isError: false, isFetching: false, isSuccess: true, answer: '' }));
    dispatch(setComments(response.data.comments));
  } catch (e: any) {
    dispatch(fetchingStop({ isError: true, isFetching: false, isSuccess: false, answer: e.message }));
  }
};

export const addComment = async (dispatch: AppDispatch, filmId: number, text: string, userId: number) => {
  const { fetching, fetchingStop } = responseSlice.actions;
  try {
    dispatch(fetching());
    const response = await CommentService.addComment(filmId, userId, text);
    dispatch(fetchingStop({ isError: false, isFetching: false, isSuccess: true, answer: response.data.message }));
    await fetchCommentsById(dispatch, filmId);
  } catch (e: any) {
    dispatch(fetchingStop({ isError: true, isFetching: false, isSuccess: false, answer: e.response.data.message }));
  }
};
