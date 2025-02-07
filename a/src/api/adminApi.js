import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/admin";

export const getAdminStats = async (token) => {
  const response = await axios.get(`${API_URL}/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getRecentOrders = async (token) => {
  const response = await axios.get(`${API_URL}/recent-orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

