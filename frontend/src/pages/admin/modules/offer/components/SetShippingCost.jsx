import { useState } from "react";
import { useLanguage } from "@/features/language/useLanguage"; // ✅ Dil desteği eklendi
import { useTheme } from "@/features/theme/useTheme";         // ✅ Tema desteği eklendi

const SetShippingCost = ({ onSetShipping }) => {
  const [shippingCost, setShippingCost] = useState(0);
  const { texts } = useLanguage(); // ✅ Dil kullanımı
  const { theme } = useTheme();    // ✅ Tema kullanımı

  const handleSubmit = (e) => {
    e.preventDefault();
    onSetShipping(shippingCost);
    alert(`${texts?.offers?.shippingCostSet || "Nakliye ücreti"} ${shippingCost} ₺ ${texts?.offers?.success || "olarak belirlendi."}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff", padding: "20px", color: theme === "dark" ? "#fff" : "#000" }}
    >
      <label>{texts?.offers?.shippingCost || "Nakliye Ücreti (₺)"}:</label>
      <input
        type="number"
        value={shippingCost}
        onChange={(e) => setShippingCost(e.target.value)}
        required
        style={{ backgroundColor: theme === "dark" ? "#333" : "#fff", color: theme === "dark" ? "#fff" : "#000", border: "1px solid #ccc", padding: "8px", marginBottom: "10px" }}
      />

      <button
        type="submit"
        style={{ backgroundColor: theme === "dark" ? "#4CAF50" : "#007BFF", color: "#fff", padding: "10px", border: "none", borderRadius: "5px" }}
      >
        {texts?.offers?.save || "Kaydet"}
      </button>
    </form>
  );
};

export default SetShippingCost; 