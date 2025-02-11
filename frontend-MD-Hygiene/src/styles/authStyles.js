import styled, { keyframes } from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => (theme === "light" ? "#f9f9f9" : "#222")};
`;

export const AuthForm = styled.form`
  background-color: ${({ theme }) => (theme === "light" ? "#fff" : "#333")};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${({ theme }) => (theme === "light" ? "#fff" : "#444")};
  color: ${({ theme }) => (theme === "light" ? "#000" : "#fff")};
`;

export const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  text-align: center;
`;

export const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => (theme === "light" ? "#333" : "#fff")};
`;

// ✅ Yüklenme Animasyonu
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spin} 1s linear infinite;
  margin: 10px auto;
`;
