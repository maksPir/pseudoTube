export interface IUser {
  email: string | null;
  password: string | null;
  id: number | null;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
export interface ICommentResponse {
  comments: IComment[] | [];
}
export interface IFilm {
  id: number;
  name: string;
  description: string;
  rate: number;
  image: string;
}
export interface IComment {
  id: number;
  email: string;
  id_user: number;
  message: string;
  date_comment: Date;
}
export interface IResponse {
  status: number;
  message: string;
}
