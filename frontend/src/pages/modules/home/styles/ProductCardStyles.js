import styled from "styled-components";

export const ProductCardContainer = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.shadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 6px;
`;

export const ProductTitle = styled.h3`
  font-size: 1.1rem;
  margin: 12px 0;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
`;

export const ProductPrice = styled.p`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  font-size: 1.2rem;
`;

export const AddToCartButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;
  margin-top: 8px;
  
  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    transform: scale(1.07);
  }
`;

export const BuyNowButton = styled.button`
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;
  margin-top: 8px;

  &:hover {
    background-color: #e68900;
    transform: scale(1.07);
  }
`;
