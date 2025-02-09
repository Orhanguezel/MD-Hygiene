// ✅ src/styles/settingsStyles.js
import styled from "styled-components";

export const SettingsContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => (theme === "dark" ? "#1e1e1e" : "#f9f9f9")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  transition: background 0.3s ease, color 0.3s ease;
`;

export const Section = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 8px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => (theme === "dark" ? "#444" : "#ccc")};
  background: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
`;

export const Select = styled.select`
  padding: 8px;
  width: 100%;
  margin-bottom: 10px;
  background: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
`;

export const Button = styled.button`
  padding: 10px 15px;
  background-color: ${({ theme }) => (theme === "dark" ? "#4caf50" : "#007bff")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => (theme === "dark" ? "#388e3c" : "#0056b3")};
  }
`;
