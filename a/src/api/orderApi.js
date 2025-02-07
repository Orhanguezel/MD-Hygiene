import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/orders";

export const getAllOrders = async (token) => {
  const response = await axios.get(`${API_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateOrderStatus = async (orderId, status, token) => {
  const response = await axios.put(`${API_URL}/${orderId}`, { status }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getOrderLocation = async (orderId, token) => {
  const response = await axios.get(`${API_URL}/${orderId}/location`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const generateQRCode = async (orderId, token) => {
  const response = await axios.get(`${API_URL}/${orderId}/generate-qr`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const verifyQRCode = async (orderId, qrCodeData, token) => {
  const response = await axios.post(
    `${API_URL}/${orderId}/verify-qr`,
    { qrCodeData },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

