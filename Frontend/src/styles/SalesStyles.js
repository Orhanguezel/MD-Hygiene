import styled from "styled-components";

/* 📌 Genel Konteyner */
export const SalesContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

/* 📌 Başlık Konteyneri */
export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

/* 📌 Başlık İkonu */
export const TitleIcon = styled.span`
  font-size: 30px;
  color: #2563eb;
`;

/* 📌 Veri Kutusu */
export const SalesWrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

/* 📌 Tablo Konteyneri */
export const TableWrapper = styled.div`
  overflow-x: auto;
`;

/* 📌 Tablo */
export const SalesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

/* 📌 Tablo Başlığı */
export const TableHeader = styled.th`
  background-color: #1f2937;
  color: white;
  padding: 12px;
  text-align: left;
  font-weight: bold;
`;

/* 📌 Tablo Satırları */
export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
  &:nth-child(even) {
    background: #f3f4f6;
  }
`;

/* 📌 Tablo Hücreleri */
export const TableData = styled.td`
  padding: 12px;
  text-align: left;
`;

/* 📌 Hata Mesajı */
export const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  text-align: center;
`;

/* 📌 Yükleme Mesajı */
export const LoadingMessage = styled.div`
  color: #007bff;
  font-weight: bold;
  text-align: center;
`;
