// src/utils/setupTokenRefresh.js
import axios from 'axios';
import { refreshAccessToken } from '../services/user.service';

export function setupTokenRefresh() {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
     
      if (error.response?.status === 401 && 
          error.config.url.includes('/users/') && 
          !error.config.url.includes('/refresh-access-token') &&
          !error.config.url.includes('/users/login')) {
        try {
       
          await refreshAccessToken();
          
          
          return axios(error.config);
        } catch (refreshError) {
          
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
}