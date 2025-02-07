// 📂 styles/OfferStyles.js
import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

export const TableHeader = styled.th`
  background: #f4f4f4;
  padding: 10px;
  text-align: left;
`;

export const TableData = styled.td`
  padding: 10px;
`;

export const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  margin-right: 5px;
  cursor: pointer;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: auto;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

