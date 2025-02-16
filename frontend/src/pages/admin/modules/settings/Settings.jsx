import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeLanguage } from "@/features/language/languageSlice";
import { toggleTheme } from "@/features/theme/themeSlice";
import {
  setCurrency,
  setShippingCost,
  setTaxRate,
  togglePaymentMethod,
} from "@/features/settings/settingsSlice";

import {
  SettingsContainer,
  Section,
  Label,
  Button,
  Select,
  Input,
  ToggleButton,
} from "./styles/settingsStyles";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { texts, language } = useSelector((state) => state.language);
  const { theme } = useSelector((state) => state.theme);
  const { currency, shippingCost, taxRate, paymentMethods } = useSelector((state) => state.settings);

  return (
    <SettingsContainer theme={theme}>
      <h1>{texts.settings.title}</h1>

      {/* 🏢 Firma ve Müşteri Yönetimi */}
      <Section>
        <h2>{texts.settings.companySettings}</h2>

        <Button onClick={() => navigate("/company-management")}>
          🏢 {texts.settings.updateCompany}
        </Button>

        <Button onClick={() => navigate("/customer-management")}>
          👤 {texts.settings.manageCustomers}
        </Button>
      </Section>

      {/* 🌍 Site Ayarları */}
      <Section>
        <h2>{texts.settings.siteSettings}</h2>

        <Label>{texts.settings.language}</Label>
        <Select value={language} onChange={(e) => dispatch(changeLanguage(e.target.value))}>
          <option value="tr">🇹🇷 Türkçe</option>
          <option value="en">🇺🇸 English</option>
          <option value="de">🇩🇪 Deutsch</option>
        </Select>

        <Label>{texts.settings.theme}</Label>
        <Button onClick={() => dispatch(toggleTheme())}>
          {theme === "dark" ? texts.settings.darkMode : texts.settings.lightMode}
        </Button>
      </Section>

      {/* 💰 Finansal Ayarlar */}
      <Section>
        <h2>{texts.settings.financialSettings}</h2>

        <Label>{texts.settings.currency}</Label>
        <Select value={currency} onChange={(e) => dispatch(setCurrency(e.target.value))}>
          <option value="EUR">💶 EUR</option>
          <option value="USD">💵 USD</option>
          <option value="TRY">🇹🇷 TRY</option>
        </Select>

        <Label>{texts.settings.shippingCost}</Label>
        <Input
          type="number"
          value={shippingCost}
          onChange={(e) => dispatch(setShippingCost(Number(e.target.value)))}
        />

        <Label>{texts.settings.taxRate}</Label>
        <Input
          type="number"
          value={taxRate}
          onChange={(e) => dispatch(setTaxRate(Number(e.target.value)))}
        />
      </Section>

      {/* 💳 Ödeme Yöntemleri */}
      <Section>
        <h2>{texts.settings.paymentMethods}</h2>

        <Label>
          <ToggleButton
            active={paymentMethods.paypal}
            onClick={() => dispatch(togglePaymentMethod("paypal"))}
          >
            {paymentMethods.paypal ? texts.settings.paypalActive : texts.settings.paypalInactive}
          </ToggleButton>
        </Label>

        <Label>
          <ToggleButton
            active={paymentMethods.stripe}
            onClick={() => dispatch(togglePaymentMethod("stripe"))}
          >
            {paymentMethods.stripe ? texts.settings.stripeActive : texts.settings.stripeInactive}
          </ToggleButton>
        </Label>

        <Label>
          <ToggleButton
            active={paymentMethods.bankTransfer}
            onClick={() => dispatch(togglePaymentMethod("bankTransfer"))}
          >
            {paymentMethods.bankTransfer
              ? texts.settings.bankTransferActive
              : texts.settings.bankTransferInactive}
          </ToggleButton>
        </Label>
      </Section>
    </SettingsContainer>
  );
};

export default Settings;
