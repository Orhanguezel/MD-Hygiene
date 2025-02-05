import styled from "styled-components";

export const InventoryContainer = styled.div`
  margin-top: 100px;
  padding: 20px;
  max-width: 1200px;
`;

export const InventoryWrapper = styled.div`
  padding: 20px;
  border-radius: 8px;
`;

export const Section = styled.div`
  background: #f3f4f6;
  padding: 20px;
  border-radius: 8px;
`;

export const SectionTitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

export const StatGrid = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 15px;
`;

export const StatCard = styled.div`
  flex: 1;
  background: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
`;

export const TableWrapper = styled.div`
  margin-top: 20px;
`;

export const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border: 2px solid #ddd;
  border-radius: 6px;
  width: 50%;
  margin: auto;
`;

export const SearchInput = styled.input`
  padding: 8px;
  border: none;
  outline: none;
  width: 100%;
`;

export const InventoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
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

export const TableData = styled.td`
  padding: 12px;
  text-align: left;
`;

export const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: bold;
  color: white;
  background-color: ${(props) =>
    props.status > 10 ? "#22c55e" : props.status > 0 ? "#eab308" : "#ef4444"};
`;

export const Button = styled.button`
  padding: 6px 12px;
  margin: 2px;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  background: ${(props) => (props.danger ? "#ef4444" : "#2563eb")};
  color: white;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background: ${(props) => (props.danger ? "#dc2626" : "#1d4ed8")};
  }
`;
