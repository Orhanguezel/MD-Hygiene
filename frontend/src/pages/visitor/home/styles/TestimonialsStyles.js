// ✅ src/pages/visitor/home/styles/TestimonialsStyles.js
import styled from "styled-components";

export const TestimonialsContainer = styled.div`
  padding: 40px 20px;
  background-color: ${({ theme }) => theme.background || "#f0f4f8"};
  text-align: center;
`;

export const TestimonialCard = styled.div`
  background: ${({ theme }) => theme.cardBackground || "#fff"};
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  max-width: 300px;
  margin: 15px auto;

  &:hover {
    transform: translateY(-10px);
  }
`;

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
`;

export const CustomerName = styled.h3`
  margin: 10px 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.primary || "#007bff"};
`;

export const Feedback = styled.p`
  color: ${({ theme }) => theme.text || "#666"};
  font-style: italic;
  margin: 10px 0;
`;

export const Rating = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 10px;
`;

export const Star = styled.span`
  color: #ffd700;
  font-size: 1.2rem;
`;

