import { FooterContainer, FooterContent, FooterTitle, CopyrightText, FooterLink } from "../styles/FooterStyles";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTitle>Inventory Management</FooterTitle>
        <CopyrightText>© 2025 MD-Hygienelogistik - Alle Rechte vorbehalten</CopyrightText>
        <CopyrightText>
          Designed by <FooterLink to="https://www.guezelwebdesign.com" target="_blank">OG</FooterLink>
        </CopyrightText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
