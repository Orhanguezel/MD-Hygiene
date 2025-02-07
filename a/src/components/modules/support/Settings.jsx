import { useContext } from "react";
import LanguageContext from "../../../context/LanguageContext";
import ThemeContext from "../../../context/ThemeContext";
import styled from "styled-components";

const SettingsContainer = styled.div`
  margin-left: 250px;
  padding: 20px;
  min-height: 100vh;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
`;

const Button = styled.button`
  background: none;
  border: 2px solid white;
  color: white;
  padding: 10px;
  margin: 10px;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: black;
  }
`;

export default function Settings() {
  const { toggleLanguage } = useContext(LanguageContext);
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <SettingsContainer>
      <h1>Ayarlar</h1>
      <Button onClick={toggleTheme}>Tema Değiştir</Button>
      <Button onClick={() => toggleLanguage("tr")}>🇹🇷 Türkçe</Button>
    </SettingsContainer>
  );
}
