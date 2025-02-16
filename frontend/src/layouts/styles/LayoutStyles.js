import styled from "styled-components";

// ✅ **Ana Layout Konteyneri**
export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.background}; /* 🔥 Sadece arka plan belirli */
  overflow-x: hidden;
`;

// ✅ **Ana İçerik Alanı**
export const MainContent = styled.main`
  flex: 1;
  overflow: auto;
  padding: 20px; /* 🔥 Biraz boşluk ekleyelim */
`;
