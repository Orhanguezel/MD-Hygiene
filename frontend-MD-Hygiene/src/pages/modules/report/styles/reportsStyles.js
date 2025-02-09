import styled from "styled-components";

export const ReportsContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.background || "#f9f9f9"};
  color: ${({ theme }) => theme.text || "#333"};
  min-height: 100vh;
`;

// Responsive grid için media queries eklendi
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
  gap: 20px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);  // Orta ekranlarda 2 sütun
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);  // Büyük ekranlarda 4 sütun
  }
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.cardBackground || "#fff"};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const StatTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.primary || "#555"};
`;

export const StatValue = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin: 10px 0 0;
  color: ${({ theme }) => theme.accent || "#000"};
`;

// Grafiklerin yan yana gösterilmesi için düzenleme
export const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr; 
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;  // Orta ekranlarda yan yana iki grafik
  }

  background: ${({ theme }) => theme.cardBackground || "#fff"};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;
