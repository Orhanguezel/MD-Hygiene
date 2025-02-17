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
  justify-content: center;  /* Kartları ortalamak için */

  @media (max-width: 768px) {
    justify-content: flex-start;  /* Küçük ekranlarda sola yaslanır */
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
  width: calc(25% - 20px);  /* 4 kart sığacak şekilde ayarlandı */
  min-width: 200px;         /* Minimum genişlik belirledim */
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    background: ${({ theme }) => (theme === "dark" ? "#444" : "#f0f0f0")};
  }

  @media (max-width: 1024px) {
    width: calc(33.33% - 20px); /* Orta ekranlarda 3 kart sığar */
  }

  @media (max-width: 768px) {
    width: calc(50% - 20px); /* Küçük ekranlarda 2 kart sığar */
  }

  @media (max-width: 480px) {
    width: 100%; /* Mobilde tek kart görünür */
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
