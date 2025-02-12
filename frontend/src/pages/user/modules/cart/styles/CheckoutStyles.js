import styled from "styled-components";

export const CheckoutContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.background || "#f9f9f9"};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.primary || "#333"};
  margin-bottom: 20px;
`;

export const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-weight: bold;
    color: ${({ theme }) => theme.text || "#333"};
  }
`;

export const Label = styled.label`
  font-weight: bold;
  color: ${({ theme }) => theme.text || "#333"};
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.primary || "#007bff"};
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

export const Summary = styled.div`
  background: ${({ theme }) => theme.cardBackground || "#f5f5f5"};
  padding: 15px;
  border-radius: 6px;
  margin-top: 20px;
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
`;

export const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
