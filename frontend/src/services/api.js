import axios from "axios";

// ✅ Ortama Göre API Adresi Belirleme
const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000" // ✅ Yerel Geliştirme Ortamı
    : "https://www.md-hygienelogistik.de/api"; // ✅ Canlı Sunucu

const API = axios.create({
  baseURL: API_BASE_URL, 
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;

