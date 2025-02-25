import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create an Axios instance with a base URL
const axiosSecure = axios.create({
  baseURL: "http://localhost:5500/api/v1",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  // Request Interceptor - Adds Authorization Header
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor - Handles Unauthorized Errors
  axiosSecure.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;
      console.log("Status error in the interceptor:", status);

      // Redirect to login if Unauthorized or Forbidden
      if (status === 401 || status === 403) {
        navigate("/"); // Redirect to home/login page
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
