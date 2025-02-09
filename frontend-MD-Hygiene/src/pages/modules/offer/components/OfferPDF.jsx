import { useLanguage } from "@/features/language/useLanguage";   // ✅ RTK Dil Yönetimi
import { useTheme } from "@/features/theme/useTheme";            // ✅ RTK Tema Yönetimi
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"; // ✅ PDF Kütüphanesi

// ✅ PDF Stilleri
const pdfStyles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 12 },
});

const MyDocument = ({ offer }) => (
  <Document>
    <Page style={pdfStyles.page}>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.title}>Teklif Detayları</Text>
        <Text style={pdfStyles.text}>Firma: {offer.companyName}</Text>
        <Text style={pdfStyles.text}>Yetkili: {offer.contactPerson}</Text>
        <Text style={pdfStyles.text}>Toplam Tutar: {offer.totals.grossAmount} €</Text>
      </View>
    </Page>
  </Document>
);

const OfferPDF = ({ offer }) => {
  const { texts } = useLanguage();
  const { theme } = useTheme();

  const handleGeneratePDF = () => {
    console.log("📄 PDF oluşturuluyor...");
    alert(texts?.offers?.pdfGenerated || "PDF başarıyla oluşturuldu!");
  };

  return (
    <div style={{ backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff", padding: "20px" }}>
      <h2 style={{ color: theme === "dark" ? "#fff" : "#000" }}>
        {texts?.offers?.pdfTitle || "Teklif PDF Görüntüle"}
      </h2>

      <PDFDownloadLink
        document={<MyDocument offer={offer} />}
        fileName="teklif.pdf"
        style={{
          backgroundColor: theme === "dark" ? "#4caf50" : "#4caf50",
          color: "#fff",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {texts?.offers?.generatePDF || "PDF Oluştur"}
      </PDFDownloadLink>
    </div>
  );
};

export default OfferPDF;
