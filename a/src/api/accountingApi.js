import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/accounting";

export const getFinancialReports = async (token, filters = {}) => {
  const response = await axios.get(`${API_URL}/financial-reports`, {
    headers: { Authorization: `Bearer ${token}` },
    params: filters,
  });
  return response.data;
};

export const calculateTaxes = async (amount, category, token) => {
  const response = await axios.post(`${API_URL}/calculate-tax`, { amount, category }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
