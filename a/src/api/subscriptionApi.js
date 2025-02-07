import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/subscriptions";

export const getSubscriptions = async (token) => {
  const response = await axios.get(`${API_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createSubscription = async (subscriptionData, token) => {
  const response = await axios.post(`${API_URL}`, subscriptionData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const cancelSubscription = async (subscriptionId, token) => {
  const response = await axios.delete(`${API_URL}/${subscriptionId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
