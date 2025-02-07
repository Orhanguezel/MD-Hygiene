import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/payments";

export const createPayment = async (paymentData, token) => {
  const response = await axios.post(`${API_URL}`, paymentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


export const processPayment = async (paymentData, token) => {
  const response = await axios.post(`${API_URL}/process`, paymentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getPaymentMethods = async (token) => {
  const response = await axios.get(`${API_URL}/methods`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

