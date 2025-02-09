import { useState } from "react";
import { useLanguage } from "@/features/language/useLanguage";  // ✅ RTK Dil Yönetimi
import { useTheme } from "@/features/theme/useTheme";           // ✅ RTK Tema Yönetimi
import {
  ShippingContainer,
  ShippingForm,
  ShippingLabel,
  ShippingInput,
  SubmitButton,
} from "../styles/offerStyles.js";  // ✅ Stil dosyası

const SetShippingCost = () => {
  const { texts } = useLanguage();
  const { theme } = useTheme();
  const [shippingCost, setShippingCost] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🚚 Nakliye Ücreti:", shippingCost);
    alert(`${texts?.offers?.shippingSet || "Nakliye ücreti"} ${shippingCost} ₺ ${texts?.offers?.saved || "olarak belirlendi."}`);
  };

  return (
    <ShippingContainer theme={theme}>
      <h2>{texts?.offers?.setShippingCost || "Nakliye Ücreti Belirle"}</h2>

      <ShippingForm onSubmit={handleSubmit} theme={theme}>
        <ShippingLabel theme={theme}>
          {texts?.offers?.shippingLabel || "Nakliye Ücreti (₺):"}
        </ShippingLabel>

        <ShippingInput
          theme={theme}
          type="number"
          value={shippingCost}
          onChange={(e) => setShippingCost(e.target.value)}
          required
        />

        <SubmitButton theme={theme} type="submit">
          {texts?.offers?.save || "Kaydet"}
        </SubmitButton>
      </ShippingForm>
    </ShippingContainer>
  );
};

export default SetShippingCost;
