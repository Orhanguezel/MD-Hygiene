export const BASE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5010/api";

export const API = {
  USERS: `${BASE_API_URL}/users`,
  ORDERS: `${BASE_API_URL}/orders`,
  PRODUCTS: `${BASE_API_URL}/products`,
  INVOICES: `${BASE_API_URL}/invoices`,
  PAYMENTS: `${BASE_API_URL}/payments`,
  MAIL: `${BASE_API_URL}/mail`,
  SALES: `${BASE_API_URL}/sales`,
  CATEGORIES: `${BASE_API_URL}/categories`,
  REVIEWS: `${BASE_API_URL}/reviews`,
  SHIPMENTS: `${BASE_API_URL}/shipments`,
  STORES: `${BASE_API_URL}/stores`, // ✅ **Yeni Mağaza API'si eklendi**
};
