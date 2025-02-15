import styled from "styled-components";

export const SettingsContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => (theme === "dark" ? "#1e1e1e" : "#f9f9f9")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  transition: background 0.3s ease, color 0.3s ease;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 10px;
`;

export const Section = styled.div`
  margin-bottom: 25px;
  padding: 15px;
  border-radius: 8px;
  background-color: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  box-shadow: ${({ theme }) =>
    theme === "dark" ? "0px 0px 10px rgba(255, 255, 255, 0.1)" : "0px 0px 10px rgba(0, 0, 0, 0.1)"};
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Select = styled.select`
  padding: 10px;
  width: 100%;
  border: 1px solid ${({ theme }) => (theme === "dark" ? "#444" : "#ccc")};
  background: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => (theme === "dark" ? "#4caf50" : "#007bff")};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => (theme === "dark" ? "#388e3c" : "#0056b3")};
    transform: scale(1.02);
  }
`;

export const Container = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => (theme === "dark" ? "#1e1e1e" : "#f9f9f9")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: auto;
`;

export const FormInput = styled.input`
  padding: 8px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => (theme === "dark" ? "#444" : "#ccc")};
  background: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  border-radius: 5px;
`;

export const ActionButton = styled.button`
  padding: 10px 15px;
  background-color: ${({ theme }) => (theme === "dark" ? "#4caf50" : "#007bff")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => (theme === "dark" ? "#388e3c" : "#0056b3")};
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  background: ${({ theme }) => (theme === "dark" ? "#222" : "#fff")};
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

export const TableCell = styled.td`
  padding: 10px;
  text-align: left;
`;

export const EditButton = styled.button`
  padding: 5px 10px;
  background-color: #ffc107;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-right: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e0a800;
  }
`;

export const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

export const SelectInput = styled.select`
  padding: 8px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => (theme === "dark" ? "#444" : "#ccc")};
  background: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  border-radius: 5px;
`;

export const ProductOption = styled.option`
  padding: 8px;
`;

export const ProductSelect = styled.select`
  padding: 8px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => (theme === "dark" ? "#444" : "#ccc")};
  background: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  border-radius: 5px;
`;