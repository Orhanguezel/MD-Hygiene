import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/email";

export const sendInvoiceEmail = async (invoiceId, token) => {
  const response = await axios.post(`${API_URL}/send-invoice`, { invoiceId }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
