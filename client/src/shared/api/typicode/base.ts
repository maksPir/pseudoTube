import axios from 'axios';
import { API_URL } from 'shared/config';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});
$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async () => {
    //const originalRequest = error.config;
    // if (
    //   error.response &&
    //   error.response.status &&
    //   error.response.status === 401 &&
    //   error.config &&
    //   !error.config._isRetry
    // ) {
    //   originalRequest._isRetry = true;
    //   try {
    //     const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
    //     localStorage.setItem('token', response.data.accessToken);
    //     return $api.request(originalRequest);
    //   } catch (error) {
    //     console.log('Не авторизован');
    //   }
    // } else {
    //   console.log('error', error);
    //   throw error;
    // }
  }
);
export default $api;
