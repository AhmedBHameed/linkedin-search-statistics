import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import environment from 'src/config/environment';

const {host, port} = environment.authenticationService;

const httpClient: AxiosInstance = axios.create({
  baseURL: `http://${host}:${port}/api`,
});

/**
 * Axios request interceptors on respond.
 */
httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    throw error.response?.data;
  }
);

export {httpClient};
