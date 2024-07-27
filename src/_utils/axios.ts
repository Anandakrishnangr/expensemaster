import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '', // replace with your backend URL
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
