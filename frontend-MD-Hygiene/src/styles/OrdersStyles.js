import styled from "styled-components";

export const OrdersContainer = styled.div`
  margin-top: 100px;
  padding: 20px;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: bold;
`;

export const TitleIcon = styled.div`
  font-size: 30px;
  color: #2563eb;
`;

export const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const TableHeader = styled.th`
  background-color: #1f2937;
  color: white;
  padding: 12px;
  text-align: left;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f3f4f6;
  }
`;

export const TableCell = styled.td`
  padding: 12px;
  text-align: left;
`;

export const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: bold;
  color: white;
  background-color: ${(props) =>
    props.status === "pending"
      ? "#eab308"
      : props.status === "completed"
      ? "#22c55e"
      : props.status === "canceled"
      ? "#ef4444"
      : "#6b7280"};
`;

export const LoadingMessage = styled.p`
  font-size: 18px;
  text-align: center;
  color: #2563eb;
`;

export const ErrorMessage = styled.p`
  font-size: 18px;
  text-align: center;
  color: #ef4444;
`;
