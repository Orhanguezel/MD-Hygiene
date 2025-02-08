import {
  SettingsContainer,
  Section,
  Label,
  Input,
  Select,
  Button,
} from "@/styles/settingsStyles";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const Settings = () => {
  const { texts, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <SettingsContainer>
      <h1>{texts.settings.title}</h1>

      <Section>
        <h2>{texts.settings.profileSettings}</h2>
        <Label>{texts.settings.name}</Label>
        <Input type="text" placeholder="Ad Soyad" />

        <Label>{texts.settings.email}</Label>
        <Input type="email" placeholder="E-posta" />

        <Button>{texts.settings.updateProfile}</Button>
      </Section>

      <Section>
        <h2>{texts.settings.appSettings}</h2>
        <Label>{texts.settings.theme}</Label>
        <Button onClick={toggleTheme}>
          {theme === "light"
            ? texts.settings.darkMode
            : texts.settings.lightMode}
        </Button>

        <Label>{texts.settings.language}</Label>
        <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="tr">Türkçe</option>
          <option value="en">English</option>
          <option value="de">Deutsch</option>
        </Select>
      </Section>

      <Section>
        <h2>{texts.settings.passwordSettings}</h2>
        <Label>{texts.settings.newPassword}</Label>
        <Input type="password" placeholder={texts.settings.newPassword} />

        <Label>{texts.settings.confirmPassword}</Label>
        <Input type="password" placeholder={texts.settings.confirmPassword} />

        <Button>{texts.settings.updatePassword}</Button>
      </Section>
    </SettingsContainer>
  );
};

export default Settings;
