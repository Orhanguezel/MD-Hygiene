import React, { useState } from "react";
import OfferForm from "./OfferForm";
import OfferPDF from "./OfferPDF"; // ✅ PDF Bileşeni
import { useLanguage } from "@/features/language/useLanguage"; // ✅ Dil Desteği
import { useTheme } from "@/features/theme/useTheme";          // ✅ Tema Desteği

const OfferPage = () => {
  const [offerData, setOfferData] = useState(null);
  const { texts } = useLanguage();
  const { theme } = useTheme();

  const handleFormSubmit = (data) => {
    setOfferData(data);
    console.log("📋 Oluşturulan Teklif:", data);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: theme === "dark" ? "#1e1e1e" : "#f9f9f9" }}>
      <h1 style={{ color: theme === "dark" ? "#fff" : "#000" }}>
        {texts?.offers?.createOffer || "Yeni Teklif Oluştur"}
      </h1>

      <OfferForm onSubmit={handleFormSubmit} />

      {offerData && (
        <div style={{ marginTop: "20px", padding: "10px", backgroundColor: theme === "dark" ? "#333" : "#fff" }}>
          <h2>{texts?.offers?.preview || "Teklif Önizleme"}</h2>
          <p><strong>{texts?.offers?.companyName || "Firma Adı"}:</strong> {offerData.companyName}</p>
          <p><strong>{texts?.offers?.contactPerson || "Yetkili"}:</strong> {offerData.contactPerson}</p>
          <p><strong>IBAN:</strong> {offerData.iban}</p>
          <p><strong>BIC:</strong> {offerData.bic}</p>

          <h3>{texts?.offers?.products || "Ürünler"}</h3>
          <ul>
            {offerData.products.map((item, index) => (
              <li key={index}>
                {item.productName} - {item.quantity} Adet - {item.unitPrice} €
              </li>
            ))}
          </ul>

          <h4>{texts?.offers?.totals || "Toplam Tutarlar"}</h4>
          <p>Net: {offerData.totals.netAmount.toFixed(2)} €</p>
          <p>KDV: {offerData.totals.taxAmount.toFixed(2)} €</p>
          <p>Brüt: {offerData.totals.grossAmount.toFixed(2)} €</p>

          {/* ✅ PDF Bileşeni */}
          <OfferPDF offer={offerData} />
        </div>
      )}
    </div>
  );
};

export default OfferPage;
