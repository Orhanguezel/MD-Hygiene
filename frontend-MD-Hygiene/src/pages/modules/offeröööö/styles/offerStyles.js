import styled from "styled-components";

export const OffersContainer = styled.div`
  padding: 20px;
  background: #f9f9f9;
`;

export const OffersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
`;

export const Th = styled.th`
  background: #007bff;
  color: white;
  padding: 10px;
`;

export const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export const StatusBadge = styled.span`
  background: ${({ status }) => (status === "approved" ? "green" : status === "rejected" ? "red" : "gray")};
  color: white;
  padding: 5px;
  border-radius: 4px;
`;

export const ActionButton = styled.button`
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

export const FormContainer = styled.form`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PreviewContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
`;

export const CloseButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
`;

export const OfferDetailsContainer = styled.div`
  padding: 20px;
`;

export const OfferInfo = styled.div`
  margin-bottom: 20px;
`;

export const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

export const ProductItem = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
`;



