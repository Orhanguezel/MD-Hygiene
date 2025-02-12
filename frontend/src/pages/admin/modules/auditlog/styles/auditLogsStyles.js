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

export const LogItemContainer = styled.div`
  background: ${({ theme }) => theme.cardBackground || "#f9f9f9"};
  padding: 10px;
  border-radius: 5px;
`;

export const StatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  background-color: ${({ $status }) =>
    $status === "Hata" ? "red" : $status === "Uyarı" ? "orange" : "green"};
`;
