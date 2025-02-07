import styled from "styled-components";

export const ReportsContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.cardBackground || "#fff"};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const StatTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

export const StatValue = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 10px 0 0;
`;

export const ChartContainer = styled.div`
  background: ${({ theme }) => theme.cardBackground || "#fff"};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;
