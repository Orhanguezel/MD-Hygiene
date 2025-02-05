import styled from "styled-components";

export const ProductsContainer = styled.div`
  margin-top: 100px;
  padding: 20px;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: bold;
`;

export const TitleIcon = styled.div`
  font-size: 28px;
  color: #1f2937;
`;

export const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 90%;
`;

export const ProductItem = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
`;

export const ProductName = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const ProductPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
`;

export const LoadingMessage = styled.p`
  font-size: 16px;
  color: #555;
`;

export const ErrorMessage = styled.p`
  font-size: 16px;
  color: red;
`;
