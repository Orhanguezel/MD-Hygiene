import axios from "axios";

// ✅ API URL (environment'dan veya localhost'tan alınır)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5010/api/offers";

// ✅ Tüm teklifler
export const getOffers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Teklifler alınamadı:", error);
    throw error;
  }
};

// ✅ Yeni teklif oluştur
export const createOffer = async (offerData) => {
  try {
    const response = await axios.post(API_URL, offerData);
    return response.data;
  } catch (error) {
    console.error("Teklif oluşturulamadı:", error);
    throw error;
  }
};

// ✅ Teklif sil
export const deleteOffer = async (offerId) => {
  try {
    await axios.delete(`${API_URL}/${offerId}`);
  } catch (error) {
    console.error("Teklif silinemedi:", error);
    throw error;
  }
};

// ✅ Teklif durumu güncelle
export const updateOfferStatus = async (offerId, status) => {
  try {
    const response = await axios.patch(`${API_URL}/${offerId}`, { status });
    return response.data;
  } catch (error) {
    console.error("Teklif durumu güncellenemedi:", error);
    throw error;
  }
};
