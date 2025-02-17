import styled from "styled-components";

export const CartContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  border-radius: 8px;
  box-shadow: 0 4px 8px ${({ theme }) => theme.shadow};
`;

export const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.cardBackground};
  padding: 15px;
  margin-bottom: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
`;

export const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.border};
`;

export const ProductDetails = styled.div`
  flex: 1;
  padding: 0 20px;

  h3 {
    margin: 0;
    color: ${({ theme }) => theme.text};
    font-size: 1.2rem;
    font-weight: bold;
  }

  p {
    color: ${({ theme }) => theme.text};
    margin: 5px 0;
  }
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ theme }) => theme.inputBackground};
  padding: 5px 10px;
  border-radius: 6px;

  span {
    font-weight: bold;
    color: ${({ theme }) => theme.text};
    font-size: 1rem;
  }
`;

export const Summary = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

export const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.disabled};
    cursor: not-allowed;
  }
`;

export const EmptyCartMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
  font-weight: bold;
  padding: 20px;
`;

export const InvoiceDetails = styled.div`
  margin-bottom: 15px;
  background: ${({ theme }) => theme.cardBackground};
  padding: 15px;
  border-radius: 8px;
  box-shadow: inset 0 1px 3px ${({ theme }) => theme.shadow};
`;

export const Invoice = styled.h3`
  color: ${({ theme }) => theme.primary};
  font-size: 1.3rem;
  font-weight: bold;
`;

export const ListItems = styled.p`
  color: ${({ theme }) => theme.text};
  margin: 0;
  font-size: 1rem;
`;

