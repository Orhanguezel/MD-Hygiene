// 📂 api/offerApi.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/offers";

export const getOffers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getOfferById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createOffer = async (offer) => {
  await axios.post(API_URL, offer);
};

export const updateOffer = async (id, updatedOffer) => {
  await axios.put(`${API_URL}/${id}`, updatedOffer);
};

export const deleteOffer = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

// ✅ **Teklif Durumu Güncelleme**
export const updateOfferStatus = async (id, status) => {
  await axios.put(`${API_URL}/${id}/status`, { status });
};

// ✅ **Teklifi E-Posta ile Gönderme**
export const sendOfferEmail = async (id, email) => {
  await axios.post(`${API_URL}/${id}/send-email`, { email });
};