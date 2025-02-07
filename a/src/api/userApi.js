import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/users";

export const getAllUsers = async (token) => {
  const response = await axios.get(`${API_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createUser = async (userData, token) => {
  const response = await axios.post(`${API_URL}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUser = async (userId, updatedData, token) => {
  const response = await axios.put(`${API_URL}/${userId}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteUser = async (userId, token) => {
  const response = await axios.delete(`${API_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
