// ✅ src/styles/FooterStyles.js
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// ✅ Footer Konteyneri
export const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.footerBackground};
  color: ${({ theme }) => theme.footerText};
  padding: 20px 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 -4px 8px ${({ theme }) => theme.shadow};
  transition: background-color 0.3s ease, color 0.3s ease;
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
  color: ${({ theme }) => theme.primary};
  margin-bottom: 10px;
`;

// ✅ Copyright Metni
export const CopyrightText = styled.p`
  font-size: 14px;
  margin: 5px 0;
  color: ${({ theme }) => theme.footerSubText};
`;

// ✅ Link Stili
export const FooterLink = styled(NavLink)`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease-in-out;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.primaryHover};
  }
`;
