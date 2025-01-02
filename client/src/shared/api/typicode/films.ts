import axios, { AxiosResponse } from 'axios';
import { IFilm, IResponse } from './models';
import { API_URL } from 'shared/config';

export default class FilmService {
  static async getAll(): Promise<AxiosResponse<IFilm[]>> {
    return axios.get<IFilm[]>(`${API_URL}/film`);
  }
  static async getRange(start: number, count: number): Promise<AxiosResponse<IFilm[]>> {
    return axios.get<IFilm[]>(`${API_URL}/film?start=${start}&count=${count}`);
  }
  static async getById(id: number): Promise<AxiosResponse<IFilm>> {
    return axios.get<IFilm>(`${API_URL}/film/${id}`);
  }
  static async addFilm(film: IFilm): Promise<AxiosResponse<IResponse>> {
    return axios.post<IResponse>(`${API_URL}/film`, {
      name: film.name,
      desc: film.description,
      rate: film.rate,
      img: film.image,
    });
  }
}
