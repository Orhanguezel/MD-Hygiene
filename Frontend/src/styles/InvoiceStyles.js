import styled from "styled-components";

// 📌 Sayfa Konteyneri
export const InvoiceContainer = styled.div`
  margin-top: 100px;
  padding: 30px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  background: #f9fafb;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

// 📌 Sayfa Başlığı
export const SectionTitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: #1f2937;
  margin-bottom: 20px;
`;

// 📌 Filtreleme Alanı
export const InvoiceFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 25px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);

  label {
    font-weight: bold;
    color: #4b5563;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    transition: 0.2s;

    &:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0px 0px 5px rgba(79, 70, 229, 0.5);
    }
  }

  button {
    padding: 10px 14px;
    background: #4f46e5;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: bold;
    transition: 0.3s;

    &:hover {
      background: #4338ca;
      transform: scale(1.05);
    }
  }
`;

// 📌 Fatura Tablosu
export const InvoiceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  th, td {
    padding: 14px;
    border-bottom: 1px solid #ddd;
    text-align: center;
  }

  th {
    background: #f3f4f6;
    color: #333;
    font-weight: bold;
  }

  tbody tr:hover {
    background: #eef2ff;
    cursor: pointer;
  }
`;

// 📌 Fatura Listesi (Kart Görünümü)
export const InvoiceList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
`;

// 📌 Fatura Kartı
export const InvoiceItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border-radius: 8px;
  background: white;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  min-width: 280px;
  justify-content: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    background: #eef2ff;
  }

  svg {
    font-size: 22px;
    color: #4f46e5;
  }
`;

// 📌 İşlem Butonları
export const InvoiceActionButton = styled.button`
  padding: 10px;
  margin-right: 6px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  transition: 0.2s;
  color: #4b5563;

  &:hover {
    color: #4f46e5;
    transform: scale(1.2);
  }
`;

// 📌 Yükleniyor Mesajı
export const LoadingMessage = styled.p`
  font-size: 18px;
  color: #4f46e5;
  text-align: center;
  font-weight: bold;
`;

// 📌 Hata Mesajı
export const ErrorMessage = styled.p`
  font-size: 16px;
  color: red;
  font-weight: bold;
  text-align: center;
`;
