import LoginPage from '../pages/LoginPage/LoginPage';
import MainPage from '../pages/MainPage/MainPage';
import AddingPage from './AddingPage/AddingPage';
import FilmPage from './FilmPage/FilmPage';

interface IRoute {
  path: routesEnum;
  component: React.ComponentType;
}
export enum routesEnum {
  LOGIN = '/login',
  MAIN = '/main',
  USER = '/user',
  FILM = '/film/:idFilm',
  FILM_ADD = '/filmAdd',
}
export const publicRoutes: IRoute[] = [
  {
    path: routesEnum.LOGIN,
    component: LoginPage,
  },
  {
    path: routesEnum.MAIN,
    component: MainPage,
  },
  {
    path: routesEnum.FILM,
    component: FilmPage,
  },
  {
    path: routesEnum.FILM_ADD,
    component: AddingPage,
  },
];

export const authRoutes: IRoute[] = [
  {
    path: routesEnum.MAIN,
    component: MainPage,
  },
];
