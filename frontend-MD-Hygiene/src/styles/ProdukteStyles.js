import styled from "styled-components";

export const ProdukteContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ProduktTitel = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;

export const ProduktListe = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ProduktElement = styled.li`
  background: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 18px;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s;

  &:hover {
    background: #e9ecef;
  }
`;

export const LadeText = styled.p`
  text-align: center;
  font-size: 18px;
  color: #007bff;
`;

export const FehlerText = styled.p`
  text-align: center;
  font-size: 18px;
  color: red;
  font-weight: bold;
`;
