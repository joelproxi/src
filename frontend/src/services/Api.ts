import axios, { AxiosHeaders } from "axios";
import { redirect } from "react-router-dom";

export const BASE_URL = "http://192.168.1.158:8000";
export const BASE_URL_WS = "ws://192.168.1.158:8000";
// export const BASE_URL = "http://0.0.0.0:8000"
// export const BASE_URL_WS = "ws://0.0.0.0:8000"

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx causes this function to trigger
    // Do something with response error
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      // Example:
      localStorage.removeItem("user");
      return redirect("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
