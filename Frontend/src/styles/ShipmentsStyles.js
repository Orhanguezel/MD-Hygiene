import styled from "styled-components";

export const ShipmentsContainer = styled.div`
margin-top: 40px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center; /* ✅ Ortalandı */
`;

/* 📌 Başlık Alanı */
export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: bold;
`;

export const TitleIcon = styled.span`
  font-size: 28px;
  color: #2563eb;
`;

export const TitleText = styled.h1`
  font-size: 35px;
  font-weight: bold;
  color: #1f2937;
`;

/* 📌 Kargo Tablosu */
export const Table = styled.table`
  width: 90%;
  border-collapse: collapse;
  margin-top: 20px;
  text-align: center;
`;

export const TableHead = styled.th`
  background: #1f2937;
  color: white;
  padding: 12px;
  font-weight: bold;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f3f4f6;
  }
`;

export const TableData = styled.td`
  padding: 12px;
  text-align: center;
  font-size: 16px;
  color: #1f2937;
`;

/* 📌 Kargo Ekleme Alanı */
export const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 80%;
  justify-content: center;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 40%;
  text-align: center;
`;

export const AddButton = styled.button`
  padding: 10px 15px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background: #0056b3;
  }
`;
