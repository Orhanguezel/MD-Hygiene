// ✅ src/styles/authStyles.js
import styled from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => (theme === "dark" ? "#1e1e1e" : "#f5f5f5")};
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
`;

export const AuthForm = styled.form`
  background: ${({ theme }) => (theme === "dark" ? "#2c2c2c" : "white")};
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => (theme === "dark" ? "#555" : "#ccc")};
  background-color: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: ${({ theme }) => (theme === "dark" ? "#4caf50" : "#4caf50")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => (theme === "dark" ? "#45a049" : "#45a049")};
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
  text-align: center;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
`;

export const LoadingMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => (theme === "dark" ? "#cccccc" : "#333333")};
  margin-top: 20px;
`;