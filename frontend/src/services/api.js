// ✅ src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // JSON Server endpoint
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
