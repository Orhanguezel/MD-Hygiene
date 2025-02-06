import styled from "styled-components";

export const AuditLogsContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
`;

export const LogsTable = styled.table`
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
  background-color: ${({ status }) =>
    status === "Bilgi" ? "#4CAF50" :
    status === "Uyarı" ? "#FF9800" :
    "#F44336"};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
`;
