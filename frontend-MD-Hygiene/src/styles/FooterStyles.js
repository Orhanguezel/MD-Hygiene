// ✅ src/styles/FooterStyles.js
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// ✅ Footer Konteyneri
export const FooterContainer = styled.footer`
  background-color: #1f2937;
  color: white;
  padding: 20px 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.5);
`;

// ✅ Footer İçeriği
export const FooterContent = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
`;

// ✅ Başlık Stili
export const FooterTitle = styled.h2`
  font-size: 22px;
  color: #facc15;
  margin-bottom: 10px;
`;

// ✅ Copyright Metni
export const CopyrightText = styled.p`
  font-size: 14px;
  margin: 5px 0;
  color: #d1d5db;
`;

// ✅ Link Stili
export const FooterLink = styled(NavLink)`
  color: #facc15;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: #fde047;
  }
`;