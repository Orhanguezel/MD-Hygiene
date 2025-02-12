import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5010/api";

// ✅ Tüm Kullanıcıları Getirme (Admin için)
export const getUsers = async (token) => {
  const response = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ✅ Kullanıcı Silme (Admin Yetkisi Gerektirir)
export const deleteUser = async (userId, token) => {
  const response = await axios.delete(`${API_URL}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ✅ Kullanıcı Aktif/Pasif Yapma
export const toggleUserStatus = async (userId, isActive, token) => {
  const response = await axios.patch(
    `${API_URL}/users/${userId}/status`,
    { isActive },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// ✅ Kullanıcı Ekleme
export const addUser = async (userData, token) => {
  const response = await axios.post(`${API_URL}/users`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ✅ Kullanıcı Güncelleme
export const updateUser = async (userId, userData, token) => {
  const response = await axios.put(`${API_URL}/users/${userId}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
