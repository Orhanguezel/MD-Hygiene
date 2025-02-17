
// ✅ src/components/admin/Footer.jsx
import { FooterContainer, FooterContent, FooterTitle, CopyrightText, FooterLink } from "./styles/footerStyles";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTitle>MD-HL</FooterTitle>
        <CopyrightText>© 2025 MD-Hygienelogistik - Tüm Hakları Saklıdır</CopyrightText>
        <CopyrightText>
          Designed by <FooterLink to="https://www.guezelwebdesign.com" target="_blank">OG</FooterLink>
        </CopyrightText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
