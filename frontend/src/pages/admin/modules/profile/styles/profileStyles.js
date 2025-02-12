
// ✅ profileStyles.js
import styled from "styled-components";

export const HomeContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.background || "#f4f4f4"};
  color: ${({ theme }) => theme.text || "#333"};
  min-height: 100vh;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
