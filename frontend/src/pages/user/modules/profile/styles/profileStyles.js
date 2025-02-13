import styled from "styled-components";

export const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Section = styled.div`
  margin: 20px 0;
  padding: 15px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Info = styled.p`
  font-size: 1rem;
  color: #555;
`;

export const InvoiceCard = styled.div`
  background: #f1f1f1;
  padding: 10px;
  margin: 5px 0;
  border-radius: 6px;
`;

export const AddressCard = styled.div`
  background: #eef;
  padding: 15px;
  border-radius: 8px;
`;

export const OrderCard = styled.div`
  background: #fcfcfc;
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
`;

export const CartItem = styled.div`
  background: #fafafa;
  padding: 8px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
`;

export const OrderDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const HomeContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.background || "#f9f9f9"};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;


export const AddressForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AddressDetails = styled.div`
  margin-bottom: 10px;
`;


