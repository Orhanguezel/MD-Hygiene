import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/expenses";

export const getExpenses = async (token) => {
  const response = await axios.get(`${API_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addExpense = async (expenseData, token) => {
  const response = await axios.post(`${API_URL}`, expenseData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
