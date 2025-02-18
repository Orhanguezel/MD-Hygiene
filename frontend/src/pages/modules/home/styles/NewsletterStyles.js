import styled from "styled-components";

export const NewsletterContainer = styled.div`
  padding: 50px 30px;
  background-color: ${({ theme }) => theme.cardBackground};
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 4px 8px ${({ theme }) => theme.shadow};
  max-width: 600px;
  margin: 40px auto; /* ✅ Sayfa ortalama */
`;

export const NewsletterTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 20px;
`;

export const NewsletterForm = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const NewsletterInput = styled.input`
  padding: 14px;
  width: 320px;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  outline: none;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.inputBackground};

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 6px ${({ theme }) => theme.primaryHover};
  }
`;

export const SubscribeButton = styled.button`
  padding: 14px 22px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    transform: scale(1.07);
  }
`;
