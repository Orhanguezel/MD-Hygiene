import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5010/api";

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/users/login`, { email, password });

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
};

export const getUserProfile = async (token) => {
  const response = await axios.get(`${API_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
