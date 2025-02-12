import styled from "styled-components";

// ✅ Tüm layout için flex yapısı
export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  overflow-x: hidden;
`;

// ✅ Ana içerik alanı
export const MainContent = styled.main`
  flex: 1; /* Ana içerik alanı tüm boşluğu kaplar */
  color: ${({ theme }) => theme.text};
  overflow: auto;
`;