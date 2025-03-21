import styled from "styled-components";

export const ArchiveContainer = styled.div`
  padding: 20px;
  background-color: ${(props) => (props.theme === "dark" ? "#1e1e1e" : "#fff")};
  color: ${(props) => (props.theme === "dark" ? "#fff" : "#000")};
`;

export const SearchInput = styled.input`
  padding: 8px;
  margin-bottom: 15px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: ${(props) => (props.theme === "dark" ? "#333" : "#fff")};
  color: ${(props) => (props.theme === "dark" ? "#fff" : "#000")};
`;

export const OfferTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${(props) => (props.theme === "dark" ? "#2c2c2c" : "#f9f9f9")};
  border: 1px solid #ddd;
`;

export const TableHead = styled.thead`
  background-color: ${(props) => (props.theme === "dark" ? "#555" : "#4CAF50")};
  color: white;

  th {
    padding: 10px;
  }
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  background-color: ${(props) => (props.theme === "dark" ? "#333" : "#fff")};
  &:nth-child(even) {
    background-color: ${(props) => (props.theme === "dark" ? "#2a2a2a" : "#f2f2f2")};
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

export const NoDataCell = styled.td`
  text-align: center;
  padding: 20px;
  color: ${(props) => (props.theme === "dark" ? "#aaa" : "gray")};
`;
