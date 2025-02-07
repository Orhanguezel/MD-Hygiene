import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/analytics";

export const getSalesAnalytics = async (token, filters = {}) => {
  const response = await axios.get(`${API_URL}/sales`, {
    headers: { Authorization: `Bearer ${token}` },
    params: filters,
  });
  return response.data;
};

export const getBestSellingProducts = async (token) => {
  const response = await axios.get(`${API_URL}/best-selling-products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getCustomerSpending = async (token) => {
  const response = await axios.get(`${API_URL}/customer-spending`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
