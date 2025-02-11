import styled from "styled-components";

export const DashboardContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => (theme === "dark" ? "#1e1e1e" : "#f9f9f9")};
  color: ${({ theme }) => (theme === "dark" ? "#f1f1f1" : "#333")};
`;

export const CardGrid = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

export const StatCard = styled.div`
  background: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#f1f1f1" : "#333")};
  border: ${({ theme }) => (theme === "dark" ? "1px solid #444" : "1px solid #ddd")};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: calc(25% - 20px);
  min-width: 200px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    background: ${({ theme }) => (theme === "dark" ? "#444" : "#f0f0f0")};
  }

  @media (max-width: 1024px) {
    width: calc(33.33% - 20px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const CardTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const CardCount = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => (theme === "dark" ? "#facc15" : "#2563eb")};
`;
