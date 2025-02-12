// ✅ src/pages/visitor/home/styles/NewsletterStyles.js
import styled from "styled-components";

export const NewsletterContainer = styled.div`
  padding: 40px 20px;
  background-color: ${({ theme }) => theme.background || "#eaf4fc"};
  text-align: center;
`;

export const NewsletterTitle = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.primary || "#007bff"};
  margin-bottom: 15px;
`;

export const NewsletterForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  padding: 10px;
  width: 250px;
  border: 1px solid ${({ theme }) => theme.border || "#ccc"};
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.primary || "#007bff"};
  }
`;

export const SubscribeButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.primary || "#007bff"};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover || "#0056b3"};
  }
`;

export const SuccessMessage = styled.p`
  color: green;
  margin-top: 15px;
  font-weight: bold;
`;

export const NewsletterInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;
