import styled from "styled-components";

export const TestimonialsContainer = styled.div`
  text-align: center;
  padding: 20px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  box-shadow: 0 1px 4px ${({ theme }) => theme.shadow};
`;

export const TestimonialCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px ${({ theme }) => theme.shadow};
  margin-bottom: 10px;
  position: relative;
  text-align: left;
  padding-left: 60px;
`;

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  left: 10px;
  top: 15px;
`;

export const CustomerName = styled.h3`
  font-size: 1rem;
  margin-bottom: 5px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`;

export const Feedback = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

export const ShowMoreButton = styled.button`
  margin-top: 10px;
  padding: 10px 15px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
  }
`;

export const ReviewForm = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  padding: 15px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 2px 6px ${({ theme }) => theme.shadow};
`;

export const ReviewInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
`;

export const SubmitButton = styled.button`
  padding: 10px 15px;
  background: ${({ theme }) => theme.primaryHover};
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primary};
    transform: scale(1.05);
  }
`;
