import styled from "styled-components";

export const ProductCardContainer = styled.div`
  background: ${({ theme }) => theme.cardBackground || "#f8f8f8"};
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
  }
`;

export const BuyNowButton = styled.button`
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;
  transition: background 0.3s;

  &:hover {
    background-color: #e68900;
  }
`;
