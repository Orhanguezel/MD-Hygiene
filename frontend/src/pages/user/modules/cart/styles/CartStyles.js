import styled from "styled-components";

export const CartContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.background || "#f9f9f9"};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.primary || "#333"};
  margin-bottom: 20px;
`;

export const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

export const ProductDetails = styled.div`
  flex: 1;
  padding: 0 20px;

  h3 {
    margin: 0;
    color: ${({ theme }) => theme.text || "#333"};
  }

  p {
    color: #555;
    margin: 5px 0;
  }
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;

  span {
    font-weight: bold;
  }
`;

export const Button = styled.button`
  background-color: ${({ primary, theme }) => (primary ? "#4CAF50" : theme.primary || "#007bff")};
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: ${({ primary }) => (primary ? "#45a049" : "#0056b3")};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Summary = styled.div`
  background: ${({ theme }) => theme.cardBackground || "#f5f5f5"};
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.text || "#333"};
`;

export const EmptyCartMessage = styled.p`
  text-align: center;
  color: #777;
  font-size: 1.2rem;
  padding: 20px;
`;

export const InvoiceDetails = styled.div`
  margin-bottom: 15px;
  background: #fff;
  padding: 10px;
  border-radius: 6px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const Invoice = styled.h3`
  color: ${({ theme }) => theme.primary || "#333"};

`;

export const ListItems = styled.p`
color: #555;
  margin: 0;
`;
