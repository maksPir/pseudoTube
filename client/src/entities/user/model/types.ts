import { IUser } from 'shared/api';

export interface IInitialState {
  user: IUser;
  isAuth: boolean;
}
export interface IAuthPayload {
  id: number;
  email: string;
  password: string;
}
