import styled from "styled-components";

// ✅ **Ana Layout Konteyneri**
export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.background}; /* 🔥 Tema desteği */
  color: ${({ theme }) => theme.text}; /* 🔥 Tema desteği */
  overflow-x: hidden;
  transition: background 0.3s ease, color 0.3s ease;
`;

// ✅ **Ana İçerik Alanı**
export const MainContent = styled.main`
  flex: 1;
  overflow: auto;
  padding: 60px 20px;
`;
