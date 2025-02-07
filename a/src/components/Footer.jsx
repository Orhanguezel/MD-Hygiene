import { useContext } from "react";
import { FooterContainer, FooterContent, FooterTitle, CopyrightText, FooterLink } from "../styles/FooterStyles";
import LanguageContext from "../context/LanguageContext";

const Footer = () => {
  const { language } = useContext(LanguageContext);

  const footerTexts = {
    en: {
      title: "Inventory Management",
      rights: "© 2025 MD-Hygienelogistik - All Rights Reserved",
      designedBy: "Designed by",
    },
    de: {
      title: "Bestandsverwaltung",
      rights: "© 2025 MD-Hygienelogistik - Alle Rechte vorbehalten",
      designedBy: "Entworfen von",
    },
    tr: {
      title: "Envanter Yönetimi",
      rights: "© 2025 MD-Hygienelogistik - Tüm Hakları Saklıdır",
      designedBy: "Tasarım:",
    },
  };

  const currentTexts = footerTexts[language] || footerTexts.de;

  return (
    <FooterContainer>
      <FooterContent>
        <FooterTitle>{currentTexts.title}</FooterTitle>
        <CopyrightText>{currentTexts.rights}</CopyrightText>
        <CopyrightText>
          {currentTexts.designedBy} <FooterLink to="https://www.guezelwebdesign.com" target="_blank">OG</FooterLink>
        </CopyrightText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

