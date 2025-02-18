import styled from "styled-components";

export const TestimonialsContainer = styled.div`
  text-align: center;
  padding: 30px;
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  border-radius: 12px;
  box-shadow: 0 6px 12px ${({ theme }) => theme.shadow};
  max-width: 900px;
  margin: 40px auto; /* ✅ Bölüm genişletildi */
`;

export const TestimonialCard = styled.div`
  background: ${({ theme }) => theme.background};
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px ${({ theme }) => theme.shadow};
  margin-bottom: 20px;
  position: relative;
  text-align: left;
  padding-left: 80px;
`;

export const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  left: 15px;
  top: 20px;
`;

export const CustomerName = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`;

export const Feedback = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${({ theme }) => theme.danger};
  color: white;
  border: none;
  padding: 7px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.dangerHover};
  }
`;

export const ShowMoreButton = styled.button`
  margin-top: 15px;
  padding: 12px 18px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 6px;
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
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  padding: 25px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  box-shadow: 0 4px 8px ${({ theme }) => theme.shadow};
`;

export const ReviewInput = styled.input`
  width: 90%;
  padding: 12px;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
`;

export const SubmitButton = styled.button`
  padding: 12px 18px;
  background: ${({ theme }) => theme.success};
  color: white;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 12px;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.successHover};
    transform: scale(1.05);
  }
`;
