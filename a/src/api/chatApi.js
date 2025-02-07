import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/chat";

export const getChatMessages = async (orderId, token) => {
  const response = await axios.get(`${API_URL}/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const sendMessage = async (orderId, message, token) => {
  const response = await axios.post(
    `${API_URL}/${orderId}`,
    { message },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
