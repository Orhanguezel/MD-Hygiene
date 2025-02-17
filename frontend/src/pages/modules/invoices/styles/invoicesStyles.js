import styled from "styled-components";

// ✅ Genel Fatura Konteyneri (Liste & Detay Sayfası)
export const InvoicesContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.background || "#f8f9fa"};
  color: ${({ theme }) => theme.text || "#333"};
  min-height: 100vh;
`;

// ✅ Fatura Listesi Tablosu
export const InvoicesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: ${({ theme }) => theme.cardBackground || "#fff"};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

// ✅ Tablo Başlıkları
export const Th = styled.th`
  background-color: ${({ theme }) => theme.primary || "#007BFF"};
  color: white;
  padding: 12px;
  text-align: left;
  font-weight: bold;
  border-bottom: 2px solid ${({ theme }) => theme.border || "#ddd"};
`;

// ✅ Tablo Hücreleri
export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.border || "#ddd"};
  color: ${({ theme }) => theme.text || "#333"};
`;

// ✅ Fatura Durumu Rozeti
export const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  background-color: ${({ status }) =>
    status === "paid"
      ? "#28a745" // Yeşil (Ödenmiş)
      : status === "overdue"
      ? "#dc3545" // Kırmızı (Gecikmiş)
      : "#ffc107"}; // Sarı (Beklemede)
`;

// ✅ İşlem Butonları
export const ActionButton = styled.button`
  background-color: ${({ theme }) => theme.buttonBackground || "#007BFF"};
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  margin: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover || "#0056b3"};
  }
`;

// ✅ Fatura Detay Sayfası Konteyneri
export const InvoiceDetailsContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.background || "#f8f9fa"};
  color: ${({ theme }) => theme.text || "#333"};
  min-height: 100vh;
`;

// ✅ Fatura Bilgileri Kutusu
export const InvoiceInfo = styled.div`
  background: ${({ theme }) => theme.cardBackground || "#f9f9f9"};
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

// ✅ Ürün Listesi Konteyneri
export const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 15px;
`;

// ✅ Ürün Listesi Öğesi
export const Item = styled.li`
  background: ${({ theme }) => theme.cardBackground || "#fff"};
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

