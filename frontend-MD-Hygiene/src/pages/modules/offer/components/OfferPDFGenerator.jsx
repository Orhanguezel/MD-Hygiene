// ✅ src/features/offer/components/OfferPDFGenerator.jsx
import { useState } from "react";
import { PDFDownloadLink, Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import { useOffers } from "@/features/offers/useOffers";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { FormInput, ActionButton, OfferFormContainer } from "../styles/offerStyles";

const styles = StyleSheet.create({
  page: { padding: 30, backgroundColor: "#fff" },
  section: { marginBottom: 15, padding: 10, borderBottom: "1px solid #ccc" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 5 },
  footer: { marginTop: 20, borderTop: "1px solid #000", paddingTop: 10, textAlign: "center" },
  logo: { width: 100, height: 50, marginBottom: 10, alignSelf: "center" },
});

const OfferPDFDocument = ({ offer, companyInfo }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>📋 Teklif Detayları</Text>
        <Text style={styles.text}>Firma: {offer.companyName}</Text>
        <Text style={styles.text}>Müşteri: {offer.customerName}</Text>
        <Text style={styles.text}>Durum: {offer.status}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>💼 Ürün Listesi</Text>
        {offer.selectedProducts.map((item, index) => (
          <Text key={index} style={styles.text}>
            {item.productName} - {item.quantity} Adet - {item.customPrice.toFixed(2)} ₺
          </Text>
        ))}
      </View>

      <View style={styles.footer}>
        {companyInfo.logo && <Image src={companyInfo.logo} style={styles.logo} />}
        <Text>{companyInfo.name}</Text>
        <Text>{companyInfo.address}</Text>
        <Text>{companyInfo.email}</Text>
      </View>
    </Page>
  </Document>
);

const OfferPDFGenerator = ({ offer, onStatusChange }) => {
  const { updateStatus } = useOffers();
  const { texts } = useLanguage();
  const { theme } = useTheme();

  const [companyInfo, setCompanyInfo] = useState({ name: "", address: "", email: "", logo: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleApproveAndGenerate = () => {
    updateStatus(offer.id, "approved");
    onStatusChange();
  };

  return (
    <OfferFormContainer theme={theme}>
      <h2>{texts?.offers?.generatePDF || "📄 PDF Oluştur"}</h2>

      <label>Firma Adı:</label>
      <FormInput type="text" name="name" value={companyInfo.name} onChange={handleInputChange} />

      <label>Adres:</label>
      <FormInput type="text" name="address" value={companyInfo.address} onChange={handleInputChange} />

      <label>E-posta:</label>
      <FormInput type="text" name="email" value={companyInfo.email} onChange={handleInputChange} />

      <label>Logo URL:</label>
      <FormInput type="text" name="logo" value={companyInfo.logo} onChange={handleInputChange} />

      <ActionButton onClick={handleApproveAndGenerate}>✅ Onayla ve PDF Oluştur</ActionButton>

      {offer.status === "approved" && (
        <PDFDownloadLink
          document={<OfferPDFDocument offer={offer} companyInfo={companyInfo} />}
          fileName="teklif.pdf"
          style={{
            marginTop: "10px",
            backgroundColor: theme === "dark" ? "#4caf50" : "#4caf50",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          📥 PDF İndir
        </PDFDownloadLink>
      )}
    </OfferFormContainer>
  );
};

export default OfferPDFGenerator;
