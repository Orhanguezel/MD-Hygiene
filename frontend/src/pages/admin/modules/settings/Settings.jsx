// ✅ src/pages/modules/settings/Settings.jsx
import { useSelector, useDispatch } from 'react-redux';
import { SettingsContainer, Section, Label, Input, Button } from "./styles/settingsStyles";

const Settings = () => {
  const dispatch = useDispatch();
  const { texts, language } = useSelector((state) => state.settings || { texts: {}, language: 'tr' });

  return (
    <SettingsContainer>
      <h1>{texts.settings?.title || "Ayarlar"}</h1>

      <Section>
        <h2>{texts.settings?.profileSettings || "Profil Ayarları"}</h2>
        <Label>{texts.settings?.name || "Ad Soyad"}</Label>
        <Input type="text" placeholder="Ad Soyad" />

        <Label>{texts.settings?.email || "E-posta"}</Label>
        <Input type="email" placeholder="E-posta" />

        <Button>{texts.settings?.updateProfile || "Profili Güncelle"}</Button>
      </Section>

      <Section>
        <h2>{texts.settings?.passwordSettings || "Şifre Ayarları"}</h2>
        <Label>{texts.settings?.newPassword || "Yeni Şifre"}</Label>
        <Input type="password" placeholder={texts.settings?.newPassword || "Yeni Şifre"} />

        <Label>{texts.settings?.confirmPassword || "Şifreyi Onayla"}</Label>
        <Input type="password" placeholder={texts.settings?.confirmPassword || "Şifreyi Onayla"} />

        <Button>{texts.settings?.updatePassword || "Şifreyi Güncelle"}</Button>
      </Section>
    </SettingsContainer>
  );
};

export default Settings;
