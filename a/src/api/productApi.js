import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/products";

export const getAllProducts = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const createProduct = async (productData, token) => {
  const response = await axios.post(`${API_URL}`, productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProduct = async (productId, updatedData, token) => {
  const response = await axios.put(`${API_URL}/${productId}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteProduct = async (productId, token) => {
  const response = await axios.delete(`${API_URL}/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
