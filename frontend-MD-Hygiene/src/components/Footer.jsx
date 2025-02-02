import { FaFacebook, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FooterContainer, FooterContent, FooterLinks, LinkItem, Copyright } from "../styles/FooterStyles";


const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <p>© {new Date().getFullYear()} MD Hygiene - Alle Rechte vorbehalten</p>
        <FooterLinks>
          <LinkItem href="https://facebook.com" target="_blank">
            <FaFacebook />
          </LinkItem>
          <LinkItem href="https://instagram.com" target="_blank">
            <FaInstagram />
          </LinkItem>
          <LinkItem href="https://linkedin.com" target="_blank">
            <FaLinkedin />
          </LinkItem>
          <LinkItem href="mailto:info@md-hygiene.de">
            <FaEnvelope />
          </LinkItem>
        </FooterLinks>
        <Copyright>Datenschutz | Impressum | AGB</Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
