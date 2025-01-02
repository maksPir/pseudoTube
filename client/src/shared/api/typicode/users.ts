import { AxiosResponse } from 'axios';
import { AuthResponse } from './models';
import $api from './base';

export default class UserService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', { email, password });
  }
  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/registration', { email, password });
  }
  static async logout(): Promise<void> {
    $api.post<AuthResponse>('/logout');
  }
}
