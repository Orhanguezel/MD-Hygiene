import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5010/api";

// ✅ Giriş Yapma (Login)
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    console.error("Giriş hatası:", error);
    throw new Error("Giriş başarısız oldu!");
  }
};

// ✅ Kullanıcı Profili Getirme
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Profil getirme hatası:", error);
    throw new Error("Profil getirilemedi!");
  }
};

// ✅ Kullanıcı Profilini Güncelleme
export const updateUserProfile = async (profileData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/auth/profile`, profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Profil güncelleme hatası:", error);
    throw new Error("Profil güncellenemedi!");
  }
};

// ✅ Şifre Değiştirme
export const changePasswordAPI = async (passwordData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/auth/change-password`, passwordData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Şifre değiştirme hatası:", error);
    throw new Error("Şifre değiştirilemedi!");
  }
};

// ✅ Çıkış Yapma (Logout)
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ✅ Tüm kullanıcıları getir
export const getUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token bulunamadı!");

    const response = await axios.get(`${API_URL}/auth/users`, {
      headers: { 
        Authorization: `Bearer ${token}` 
      }
    });
    return response.data;
  } catch (error) {
    console.error("Kullanıcıları getirme hatası:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Kullanıcılar getirilemedi!");
  }
};



// ✅ Kullanıcı Durumunu Güncelle (Aktif/Pasif)
export const toggleUserStatusAPI = async (userId, isActive) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/auth/users/${userId}/status`,
      { isActive },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Kullanıcı durumu güncelleme hatası:", error);
    throw new Error("Kullanıcı durumu güncellenemedi!");
  }
};


