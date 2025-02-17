import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import OfferPDFDocument from "./OfferPDFDocument";
import { FormInput, ActionButton, OfferFormContainer } from "../styles/offerStyles";
import { useLanguage } from "@/features/language/useLanguage"; // ✅ Dil desteği eklendi
import { useTheme } from "@/features/theme/useTheme";         // ✅ Tema desteği eklendi

const OfferPDF = ({ offer }) => {
  const [companyInfo, setCompanyInfo] = useState({
    name: "MD-Hygienelogistik",
    address: "Berlin, Germany",
    email: "info@firma.com",
    logo: "",
  });
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const { texts } = useLanguage(); // ✅ Dil kullanımı
  const { theme } = useTheme();    // ✅ Tema kullanımı

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDF = async () => {
    setLoading(true);
    const blob = await pdf(
      <OfferPDFDocument offer={offer} companyInfo={companyInfo} notes={notes} />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `teklif-${offer.id}.pdf`;
    link.click();

    URL.revokeObjectURL(url);
    setLoading(false);
  };

  return (
    <OfferFormContainer style={{ backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff", color: theme === "dark" ? "#fff" : "#000" }}>
      <h2>{texts?.offers?.pdfFormTitle || "📄 PDF Teklif Formu"}</h2>

      <label>{texts?.offers?.companyName || "Firma Adı"}:</label>
      <FormInput
        type="text"
        name="name"
        value={companyInfo.name}
        onChange={handleInputChange}
        style={{ backgroundColor: theme === "dark" ? "#333" : "#fff", color: theme === "dark" ? "#fff" : "#000" }}
      />

      <label>{texts?.offers?.address || "Adres"}:</label>
      <FormInput
        type="text"
        name="address"
        value={companyInfo.address}
        onChange={handleInputChange}
        style={{ backgroundColor: theme === "dark" ? "#333" : "#fff", color: theme === "dark" ? "#fff" : "#000" }}
      />

      <label>{texts?.offers?.email || "E-posta"}:</label>
      <FormInput
        type="text"
        name="email"
        value={companyInfo.email}
        onChange={handleInputChange}
        style={{ backgroundColor: theme === "dark" ? "#333" : "#fff", color: theme === "dark" ? "#fff" : "#000" }}
      />

      <label>{texts?.offers?.notes || "Notlar"}:</label>
      <FormInput
        type="text"
        name="notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={{ backgroundColor: theme === "dark" ? "#333" : "#fff", color: theme === "dark" ? "#fff" : "#000" }}
      />

      <ActionButton onClick={generatePDF} disabled={loading} style={{ backgroundColor: theme === "dark" ? "#4CAF50" : "#007BFF", color: "#fff" }}>
        {loading ? texts?.offers?.loading || "⏳ Yükleniyor..." : texts?.offers?.generatePDF || "📥 PDF Oluştur ve İndir"}
      </ActionButton>
    </OfferFormContainer>
  );
};

export default OfferPDF; 