import styled from "styled-components";

export const UsersContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const UsersTable = styled.table`
  width: 90%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const TableHeader = styled.th`
  background-color: #1f2937;
  color: white;
  padding: 12px;
  font-size: 16px;
  text-align: left;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
  transition: background 0.3s ease;

  &:nth-child(even) {
    background-color: #f8f9fa; /* ✅ Alternatif satır rengi */
  }

  &:hover {
    background-color: #e2e8f0;
  }
`;

export const TableCell = styled.td`
  padding: 12px;
  text-align: left;
  font-size: 14px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: bold;
`;

export const TitleIcon = styled.div`
  font-size: 28px;
  color: #1f2937;
`;

export const LoadingMessage = styled.p`
  font-size: 16px;
  color: #555;
`;

export const ErrorMessage = styled.p`
  font-size: 16px;
  color: red;
`;
