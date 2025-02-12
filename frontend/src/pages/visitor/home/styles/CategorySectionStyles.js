// ✅ src/pages/visitor/home/styles/CategorySectionStyles.js
import styled from "styled-components";

export const CategoryContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  justify-content: center;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.background || "#f8f8f8"};
`;

export const CategoryCard = styled.div`
  width: 180px;
  height: 200px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  text-align: center;

  &:hover {
    transform: translateY(-8px);
  }
`;

export const CategoryImage = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
`;

export const CategoryTitle = styled.h3`
  padding: 10px;
  font-size: 1rem;
  color: ${({ theme }) => theme.primary || "#333"};
`;

export const CategoryDescription = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text || "#555"};
`;

export const CategoryButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.primary || "#007bff"};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover || "#0056b3"};
  }
`;

export const ProductCard = styled.div`
  min-width: 200px;
  flex: 0 0 auto;
  background: ${({ theme }) => theme.cardBackground || "#f8f8f8"};
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  scroll-snap-align: start;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
`;

export const ProductTitle = styled.h3`
  font-size: 1rem;
  margin: 10px 0;
  color: ${({ theme }) => theme.text || "#333"};
`;

export const ProductPrice = styled.p`
  color: ${({ theme }) => theme.primary || "#007bff"};
  font-weight: bold;
`;

export const ProductList = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  justify-content: center;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.background || "#f8f8f8"};
`;
