// Обновление аунтификации без верификации

import axios from 'axios';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
const setupAxiosInterceptors = (navigate) => {
  const refreshToken = async () => {
    try {
      const response = await axios.post('/api/auth/refresh-token', {
        refreshToken: localStorage.getItem('refreshToken'),
      });
      const { accessToken } = response.data;
      localStorage.setItem('token', accessToken);
      return accessToken;
    } catch (error) {
      console.error('Ошибка обновления токена', error);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
  };

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const accessToken = await refreshToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return axios(originalRequest);
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
