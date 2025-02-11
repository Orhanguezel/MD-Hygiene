import styled from "styled-components";

// ✅ Tüm layout için flex yapısı
export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ekran yüksekliği kadar uzanır */
  overflow-x: hidden;
`;

export const MainContent = styled.main`
  flex: 1; /* Ana içerik alanı tüm boşluğu kaplar */

  padding: 80px 20px 20px 40px; 
  color: white;
  overflow: auto;
  
`;

export const Footer = styled.footer`
  background-color: #111827;
  color: white;
  text-align: center;
  padding: 15px 0;
  font-size: 14px;
  border-top: 1px solid #374151;
`;
