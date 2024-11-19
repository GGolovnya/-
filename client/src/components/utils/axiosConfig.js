import axios from 'axios';

const setupAxiosInterceptors = (navigate) => {
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;