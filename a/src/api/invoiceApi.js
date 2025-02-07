import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/invoices";

export const getInvoices = async (token) => {
  const response = await axios.get(`${API_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createInvoice = async (invoiceData, token) => {
  const response = await axios.post(`${API_URL}`, invoiceData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const sendInvoiceReminder = async (invoiceId, token) => {
  const response = await axios.post(`${API_URL}/${invoiceId}/reminder`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
