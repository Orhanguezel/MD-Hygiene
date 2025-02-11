import styled from "styled-components";

export const InvoicesContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
`;

export const InvoicesTable = styled.table`
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
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  background-color: ${({ status }) =>
    status === "paid"
      ? "#4CAF50"
      : status === "overdue"
      ? "#F44336"
      : "#FFC107"};
`;

export const ActionButton = styled.button`
  background-color: ${({ theme }) => theme.buttonBackground || "#007BFF"};
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover || "#0056b3"};
  }
`;

export const InvoiceDetailsContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
`;

export const InvoiceInfo = styled.div`
  background: ${({ theme }) => theme.cardBackground || "#f9f9f9"};
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const Item = styled.li`
  background: ${({ theme }) => theme.cardBackground || "#fff"};
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;
