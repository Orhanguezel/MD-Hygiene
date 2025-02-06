import styled from "styled-components";

export const SettingsContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
`;

export const Section = styled.div`
  background: ${({ theme }) => theme.cardBackground || "#fff"};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid ${({ theme }) => theme.border || "#ccc"};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.inputBackground || "#fff"};
  color: ${({ theme }) => theme.text};
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid ${({ theme }) => theme.border || "#ccc"};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.inputBackground || "#fff"};
  color: ${({ theme }) => theme.text};
`;

export const Button = styled.button`
  background: ${({ theme }) => theme.buttonBackground || "#4CAF50"};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.buttonHover || "#45a049"};
  }
`;
