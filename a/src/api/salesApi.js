import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/sales";

export const getSalesData = async (token, filters = {}) => {
  const response = await axios.get(`${API_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
    params: filters,
  });
  return response.data;
};
