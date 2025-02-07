import styled from "styled-components";
import { NavLink } from "react-router-dom";

// ✅ Footer Konteyneri
export const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #1f2937;
  color: white;
  text-align: center;
  padding: 15px 0;
  font-size: 14px;
`;

// ✅ Footer İçeriği
export const FooterContent = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 0 20px;
`;

// ✅ Başlık Stili
export const FooterTitle = styled.h2`
  font-size: 18px;
  color: white;
  margin-bottom: 15px;
`;

// ✅ Copyright Metni
export const CopyrightText = styled.p`
  font-size: 14px;
  margin: 5px 0;
`;

// ✅ Link Stili
export const FooterLink = styled(NavLink)`
  color: #facc15;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
