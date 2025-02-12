import styled from "styled-components";

export const CarouselContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.background || "#fff"};
  text-align: center;
`;

export const CarouselWrapper = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 10px 0;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary || "#888"};
    border-radius: 4px;
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
  position: relative;

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

export const CarouselNavigation = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const CarouselButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const NavButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const AddToCartButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

export const FavoriteIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: ${({ isFavorite }) => (isFavorite ? "#e74c3c" : "#ccc")};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #e74c3c;
  }
`;

export const ProductBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: ${({ badgeType }) =>
    badgeType === "Sale"
      ? "#e74c3c"
      : badgeType === "New"
      ? "#007bff"
      : "#ffc107"};
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const StockInfo = styled.div`
  margin-top: 5px;
  font-size: 0.85rem;
  color: ${({ inStock }) => (inStock ? "#28a745" : "#dc3545")};
  font-weight: bold;
`;

export const ProductLabel = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: ${({ theme }) => theme.primary || "#007bff"};
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const StockStatus = styled.p`
  color: ${({ theme }) => theme.primary || "#007bff"};
  font-weight: bold;
`;


