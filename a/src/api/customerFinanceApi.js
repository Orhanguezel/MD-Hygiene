import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/customers/finance";

export const getCustomerFinancialData = async (customerId, token) => {
  const response = await axios.get(`${API_URL}/${customerId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
