import styled from "styled-components";

export const ProductDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

export const ProductImage = styled.img`
  width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px ${({ theme }) => theme.shadow};
`;

export const ImageCarousel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SmallImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin: 5px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.2s ease-in-out;

  &:hover {
    border: 2px solid ${({ theme }) => theme.primary};
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
`;

export const ProductTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

export const ProductPrice = styled.p`
  font-size: 20px;
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
`;

export const StockStatus = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.text === "dark" ? "#ff4d4d" : "#28a745"};
`;

export const ProductDescription = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: ${({ theme }) => theme.text};
`;

export const AddToCartButton = styled.button`
  padding: 10px 20px;
  background: ${({ theme }) => theme.success};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.successHover};
  }

  &:disabled {
    background: ${({ theme }) => theme.disabled};
    cursor: not-allowed;
  }
`;

export const FavoriteButton = styled.button`
  padding: 10px 20px;
  background: ${({ theme, $favorited }) => ($favorited === "true" ? theme.danger : theme.cardBackground)};
  color: ${({ theme, $favorited }) => ($favorited === "true" ? "white" : theme.text)};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme, $favorited }) => ($favorited === "true" ? theme.dangerHover : theme.border)};
  }
`;

export const BackButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 120px;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
  }
`;
