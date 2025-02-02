import styled from "styled-components";

// Styled Components


const Content = styled.div`
  text-align: center;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const ProductCard = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #222;
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  color: #e63946;
  font-weight: bold;
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: #0077b6;
`;

const ErrorText = styled.p`
  font-size: 1.2rem;
  color: red;
  font-weight: bold;
`;


export { Container, Content, Title, ProductGrid, ProductCard, ProductName, ProductPrice, LoadingText, ErrorText };

