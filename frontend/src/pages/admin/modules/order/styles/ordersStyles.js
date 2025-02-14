import styled from "styled-components";

export const OrdersContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
`;

export const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const Th = styled.th`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 10px;
  text-align: left;
`;

export const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const StatusBadge = styled.span`
  background-color: ${({ $status }) =>
    $status === "delivered" ? "#4CAF50" :
    $status === "pending" ? "#FF9800" :
    $status === "cancelled" ? "#F44336" : "#9E9E9E"};
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
`;

export const ActionButton = styled.button`
  background-color: ${({ theme }) => theme.buttonBackground || "#2196F3"};
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover || "#1976D2"};
  }
`;

// ✅ OrderDetails Styles
export const OrderDetailsContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
`;

export const OrderInfo = styled.div`
  background: ${({ theme }) => theme.cardBackground || "#f9f9f9"};
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const ProductList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ProductItem = styled.li`
  background: ${({ theme }) => theme.cardBackground || "#fff"};
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

