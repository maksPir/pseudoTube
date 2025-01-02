import { IFilm } from 'shared/api';

export interface ICardFilmProps {
  film: IFilm;
  ref?: (node?: Element | null | undefined) => void;
}
export interface IFilmInitialState {
  films: IFilm[];
  error: boolean;
  isEnd: boolean;
}
export interface IFilmRangeParams {
  start: number;
  count: number;
}
export interface IFilmResponse {
  films: IFilm[];
  count: number;
}
