import styled from "styled-components";

export const ConfirmationContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const Message = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

export const OrderDetails = styled.div`
  text-align: left;
  margin-bottom: 20px;
`;

export const DetailItem = styled.p`
  font-size: 14px;
  margin: 5px 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const Button = styled.button`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;

  &:hover {
    opacity: 0.8;
  }
`;
