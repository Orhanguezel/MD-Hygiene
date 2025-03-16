import styled from "styled-components";

export const FavoritesContainer = styled.div`
  padding: 20px;
`;

export const FavoriteCard = styled.div`
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme === "dark" ? "0 0 10px #333" : "0 0 10px #ccc"};
  display: flex;
  align-items: center;
`;

export const FavoriteImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin-right: 15px;
`;

export const FavoriteTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 5px;
`;

export const FavoritePrice = styled.p`
  color: green;
`;

export const RemoveButton = styled.button`
  padding: 6px 12px;
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const EmptyMessage = styled.p`
  text-align: center;
  color: gray;
  font-size: 18px;
`;
