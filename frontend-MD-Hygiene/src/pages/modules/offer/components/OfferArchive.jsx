// Güncellenmiş dosya: OfferArchive.jsx

import { useOffers } from "@/features/offer/useOffers";
import OfferPDF from "./OfferPDF";
import { useState } from "react";
import { useLanguage } from "@/features/language/useLanguage"; // ✅ Dil desteği eklendi
import { useTheme } from "@/features/theme/useTheme";         // ✅ Tema desteği eklendi

const OfferArchive = () => {
  const { offers = [] } = useOffers();
  const [searchTerm, setSearchTerm] = useState("");
  const { texts } = useLanguage(); // ✅ Dil kullanımı
  const { theme } = useTheme();    // ✅ Tema kullanımı

  const archivedOffers = offers.filter((offer) => offer?.status === "archived");

  const filteredOffers = archivedOffers.filter((offer) => {
    const companyName = offer?.companyName?.toLowerCase() || "";
    return companyName.includes(searchTerm.toLowerCase());
  });

  return (
    <div style={{ padding: "20px", backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff", color: theme === "dark" ? "#fff" : "#000" }}>
      <h2>{texts?.offers?.archivedTitle || "📁 Arşivlenmiş Teklifler"}</h2>

      <input
        type="text"
        placeholder={texts?.offers?.searchPlaceholder || "Firma adı ile ara..."}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "15px",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          backgroundColor: theme === "dark" ? "#333" : "#fff",
          color: theme === "dark" ? "#fff" : "#000"
        }}
      />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: theme === "dark" ? "#2c2c2c" : "#f9f9f9",
          border: "1px solid #ddd",
        }}
      >
        <thead style={{ backgroundColor: theme === "dark" ? "#555" : "#4CAF50", color: "white" }}>
          <tr>
            <th>ID</th>
            <th>{texts?.offers?.companyName || "Firma Adı"}</th>
            <th>{texts?.offers?.customerName || "Müşteri Adı"}</th>
            <th>{texts?.offers?.status || "Durum"}</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          {filteredOffers.map((offer) => (
            <tr key={offer.id}>
              <td>{offer.id || "N/A"}</td>
              <td>{offer.companyName || texts?.offers?.unknown || "Bilinmiyor"}</td>
              <td>{offer.customerName || texts?.offers?.unknown || "Bilinmiyor"}</td>
              <td>{offer.status || texts?.offers?.unknown || "Bilinmiyor"}</td>
              <td>
                {offer.selectedProducts?.length > 0 ? (
                  <OfferPDF offer={offer} />
                ) : (
                  <span style={{ color: "gray" }}>{texts?.offers?.noData || "Veri Yok"}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredOffers.length === 0 && (
        <p style={{ marginTop: "20px", color: theme === "dark" ? "#aaa" : "gray" }}>
          {texts?.offers?.noArchived || "Arşivlenmiş teklif bulunamadı."}
        </p>
      )}
    </div>
  );
};

export default OfferArchive; 
