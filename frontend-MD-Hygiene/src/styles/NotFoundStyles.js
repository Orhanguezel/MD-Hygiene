import styled from "styled-components";

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background-color: ${({ theme }) => (theme === "dark" ? "#1e1e1e" : "#f9f9f9")};
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#333333")};
  transition: all 0.3s ease;
`;

export const Emoji = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
`;

export const NotFoundTitle = styled.h1`
  font-size: 2.5rem;
  margin: 10px 0;
  color: ${({ theme }) => theme.primary || "#ff4757"};
  text-align: center;
  transition: color 0.3s ease;
`;

export const NotFoundMessage = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin: 10px 0 20px;
  line-height: 1.6;
  color: ${({ theme }) => (theme === "dark" ? "#dcdcdc" : "#666666")};
`;

export const HomeButton = styled.button`
  background-color: ${({ theme }) => theme.primary || "#007bff"};
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondary || "#0056b3"};
    transform: translateY(-3px);
  }
`;
