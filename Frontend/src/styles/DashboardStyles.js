import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  padding: 20px;
`;

export const StatCard = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const StatTitle = styled.h3`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 8px;
`;

export const StatValue = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #222;
`;

export const ChartContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

