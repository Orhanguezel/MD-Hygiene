import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // ✅ JSON Server'ın çalıştığı adres
});

// ✅ Hata Yakalama (Unauthorized durumunda logout)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user'); // ✅ Sadece kullanıcı bilgisini temizle
      window.location.href = '/login'; // ✅ Giriş sayfasına yönlendir
    }
    return Promise.reject(error);
  }
);

export default API;