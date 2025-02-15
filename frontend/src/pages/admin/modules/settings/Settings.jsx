import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLanguage, toggleTheme } from "@/features/settings/settingsSlice";
import { SettingsContainer, Section, Label, Button, Select } from "./styles/settingsStyles";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { texts, language, theme } = useSelector((state) => state.settings);

  return (
    <SettingsContainer theme={theme}>
      <h1>{texts.settings?.title || "Ayarlar"}</h1>

      {/* 🧑‍💼 Profil Ayarları */}
      <Section>
        <h2>{texts.settings?.profileSettings || "Profil Ayarları"}</h2>
        <Button onClick={() => navigate("/settings/profile")}>
          📝 {texts.settings?.updateProfile || "Profili Güncelle"}
        </Button>
      </Section>

      {/* 🏢 Firma ve Müşteri Yönetimi */}
      <Section>
        <h2>{texts.settings?.companySettings || "Firma & Müşteri Yönetimi"}</h2>

        <Button onClick={() => navigate("/company-management")}>
          🏢 {texts.settings?.updateCompany || "Firma Bilgilerini Güncelle"}
        </Button>

        <Button onClick={() => navigate("/customer-management")}>
          👤 {texts.settings?.manageCustomers || "Müşteri Yönetimi"}
        </Button>
      </Section>

      {/* 🌍 Site Ayarları */}
      <Section>
        <h2>{texts.settings?.siteSettings || "Site Ayarları"}</h2>

        <Label>{texts.settings?.language || "Dil Seçimi"}</Label>
        <Select
          value={language}
          onChange={(e) => dispatch(setLanguage(e.target.value))}
        >
          <option value="tr">🇹🇷 Türkçe</option>
          <option value="en">🇺🇸 English</option>
          <option value="de">🇩🇪 Deutsch</option>
        </Select>

        <Label>{texts.settings?.theme || "Tema"}</Label>
        <Button onClick={() => dispatch(toggleTheme())}>
          {theme === "dark" ? "🌙 Karanlık Mod" : "☀️ Aydınlık Mod"}
        </Button>
      </Section>
    </SettingsContainer>
  );
};

export default Settings;
