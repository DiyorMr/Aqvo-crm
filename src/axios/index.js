import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = "https://aqvo.limsa.uz/api/";

export const httpRequest = (() => {
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000, 
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("accToken");
        window.location.href = "/login";
        return Promise.reject(new Error("Authentication failed. Please login again."));
      }

      const errorMessage = error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
      return Promise.reject(error);
    }
  );


  return axiosInstance;
})();

export default httpRequest;