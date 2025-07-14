import axios from 'axios';
import { getUser } from '../utils/storage';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Interceptor to add Authorization header if user is logged in
axiosInstance.interceptors.request.use(
  (config) => {
    const user = getUser();
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
