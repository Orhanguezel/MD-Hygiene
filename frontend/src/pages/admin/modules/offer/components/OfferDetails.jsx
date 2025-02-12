// Güncellenmiş dosya: OfferDetails.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLanguage } from "@/features/language/useLanguage"; // ✅ Dil desteği eklendi
import { useTheme } from "@/features/theme/useTheme";           // ✅ Tema desteği eklendi

const OfferDetails = () => {
  const { id } = useParams();
  const offers = useSelector((state) => state.offer);
  const [offer, setOffer] = useState(null);
  const { texts } = useLanguage(); // ✅ Dil kullanımı
  const { theme } = useTheme();    // ✅ Tema kullanımı

  useEffect(() => {
    const foundOffer = offers.find((o) => o.id === id);
    setOffer(foundOffer);
  }, [offers, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOffer((prev) => ({ ...prev, [name]: value }));
  };

  if (!offer) return <p>{texts?.offers?.notFound || "Teklif bulunamadı."}</p>;

  return (
    <div style={{ backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff", padding: "20px", color: theme === "dark" ? "#fff" : "#000" }}>
      <h2>{texts?.offers?.detailsTitle || "📋 Teklif Detayları"}</h2>

      <label>{texts?.offers?.companyName || "🏢 Firma Adı"}:</label>
      <input
        type="text"
        name="companyName"
        value={offer.companyName}
        onChange={handleInputChange}
        style={{ backgroundColor: theme === "dark" ? "#333" : "#fff", color: theme === "dark" ? "#fff" : "#000", border: "1px solid #ccc", padding: "8px", marginBottom: "10px" }}
      />

      <label>{texts?.offers?.customerName || "👤 Müşteri Adı"}:</label>
      <input
        type="text"
        name="customerName"
        value={offer.customerName}
        onChange={handleInputChange}
        style={{ backgroundColor: theme === "dark" ? "#333" : "#fff", color: theme === "dark" ? "#fff" : "#000", border: "1px solid #ccc", padding: "8px", marginBottom: "10px" }}
      />

      <label>{texts?.offers?.status || "📊 Durum"}:</label>
      <input
        type="text"
        name="status"
        value={offer.status}
        onChange={handleInputChange}
        style={{ backgroundColor: theme === "dark" ? "#333" : "#fff", color: theme === "dark" ? "#fff" : "#000", border: "1px solid #ccc", padding: "8px", marginBottom: "10px" }}
      />
    </div>
  );
};

export default OfferDetails; 
