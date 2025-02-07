import styled from "styled-components";

export const OrdersContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
`;

export const OrderDetailsContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

export const OrderInfo = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: ${({ theme }) => theme.cardBackground || "#fff"};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: ${({ theme }) => theme.cardBackground || "#fff"};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

export const Th = styled.th`
  padding: 12px;
  background: ${({ theme }) => theme.primary};
  color: white;
  text-align: left;
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.border || "#ddd"};
`;

export const StatusBadge = styled.span`
  background-color: ${({ status, theme }) =>
    status === "Tamamlandı" ? "#4CAF50" :
    status === "Beklemede" ? "#FFA500" :
    "#F44336"};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
`;

export const ActionButton = styled.button`
  background: ${({ theme }) => theme.buttonBackground || "#4CAF50"};
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.buttonHover || "#45a049"};
  }
`;
