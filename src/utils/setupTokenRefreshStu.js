import { refreshAccessTokenStu } from "@/services/student.service";
import axios from "axios";
// src/utils/setupTokenRefreshStu.js
export function setupTokenRefreshStu() {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 && 
          error.config.url.includes('/students/') && 
          !error.config.url.includes('/refresh-access-token') &&
          !error.config.url.includes('/students/login')) {
        try {
          await refreshAccessTokenStu();
          return axios(error.config);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
}