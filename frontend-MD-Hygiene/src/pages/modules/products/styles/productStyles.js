import styled from "styled-components";

export const ProductContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => (theme === "dark" ? "#1e1e1e" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
`;

export const SidebarContainer = styled.div`
  width: 200px;
  background: #f4f4f4;
  padding: 10px;
`;

export const SidebarButton = styled.button`
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

export const FormContainer = styled.form`
  background: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  background: ${({ theme }) => (theme === "dark" ? "#555" : "#f9f9f9")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background: #28a745;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: #218838;
  }
`;

export const ListContainer = styled.div`
  padding: 20px;
`;

export const ProductItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export const ProductTitle = styled.h3`
  margin: 0;
`;

export const ProductPrice = styled.p`
  margin: 0;
  font-weight: bold;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const ProductButton = styled.button`
  padding: 5px 10px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

export const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

export const ProductDetails = styled.div`
  display: flex;
  gap: 20px;
`;

export const ProductDescription = styled.p`
  margin: 0;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductQuantity = styled.p`
  margin: 0;
`;

export const ProductPriceContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const ProductPriceLabel = styled.strong`
  font-size: 1.2rem;
`;

export const ProductPriceValue = styled.span`
  font-size: 1.2rem;
`;

export const ProductQuantityInput = styled.input`
  padding: 5px;
  width: 50px;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;






