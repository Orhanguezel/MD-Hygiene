import styled from "styled-components";

export const NewsletterContainer = styled.div`
  padding: 40px 20px;
  background-color: ${({ theme }) => theme.background};
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 6px ${({ theme }) => theme.shadow};
`;

export const NewsletterTitle = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 15px;
`;

export const NewsletterForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const NewsletterInput = styled.input`
  padding: 12px;
  width: 280px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  outline: none;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.inputBackground};

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 5px ${({ theme }) => theme.primaryHover};
  }
`;

export const SubscribeButton = styled.button`
  padding: 12px 20px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
  }
`;
