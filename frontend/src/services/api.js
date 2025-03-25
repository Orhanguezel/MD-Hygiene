import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Token varsa sadece o zaman ekle
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Hata yönetimi: sadece giriş yapılmışsa yönlendirme yap
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const token = localStorage.getItem("token");

    if (token && (error.response?.status === 401 || error.response?.status === 403)) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;
