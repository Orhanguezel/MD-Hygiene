import OfferPDF from "./OfferPDF";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOffers } from "@/features/offer/offerSlice";
import { useLanguage } from "@/features/language/useLanguage"; // ✅ Dil desteği
import { useTheme } from "@/features/theme/useTheme";         // ✅ Tema desteği
import { toast } from "react-toastify";

const OfferArchive = () => {
  const dispatch = useDispatch();
  const { texts } = useLanguage(); // ✅ Dil kullanımı
  const { theme } = useTheme();    // ✅ Tema kullanımı
  const { offers } = useSelector((state) => state.offer);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchOffers()); // ✅ Redux Store'dan teklifleri çek
  }, [dispatch]);

  const archivedOffers = offers?.filter((offer) => offer.status === "archived") || [];

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

      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: theme === "dark" ? "#2c2c2c" : "#f9f9f9", border: "1px solid #ddd" }}>
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
          {filteredOffers.length > 0 ? (
            filteredOffers.map((offer) => (
              <tr key={offer.id}>
                <td>{offer.id || "N/A"}</td>
                <td>{offer.companyName || texts?.offers?.unknown || "Bilinmiyor"}</td>
                <td>{offer.customerName || texts?.offers?.unknown || "Bilinmiyor"}</td>
                <td>{texts?.offers?.[offer.status] || offer.status || "Taslak"}</td>
                <td>
                  {offer.selectedProducts?.length > 0 ? (
                    <OfferPDF offer={offer} />
                  ) : (
                    <span style={{ color: "gray" }}>{texts?.offers?.noData || "Veri Yok"}</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px", color: theme === "dark" ? "#aaa" : "gray" }}>
                {texts?.offers?.noArchived || "Arşivlenmiş teklif bulunamadı."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OfferArchive;
