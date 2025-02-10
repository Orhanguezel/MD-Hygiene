import { PDFDownloadLink, Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import { useDispatch } from "react-redux";
import { updateOfferStatus } from "@/features/offer/offerSlice";
import logo from "@/assets/logo.png";  // Firma logosu

const styles = StyleSheet.create({
  page: { padding: 30, backgroundColor: "#fff" },
  section: { marginBottom: 15 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 5 },
  footer: { marginTop: 20, textAlign: "center", fontSize: 10, borderTop: "1px solid #ccc", paddingTop: 5 }
});

const MyDocument = ({ offer }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>📋 Teklif Detayları</Text>
        <Text style={styles.text}>Firma: {offer.companyName}</Text>
        <Text style={styles.text}>Müşteri: {offer.customerName}</Text>
        <Text style={styles.text}>Durum: {offer.status}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>📦 Ürünler</Text>
        {offer.selectedProducts.map((item, index) => (
          <Text key={index} style={styles.text}>
            {item.productName} - {item.quantity} Adet - {item.customPrice.toFixed(2)} ₺
          </Text>
        ))}
      </View>

      <View style={styles.footer}>
        <Image src={logo} style={{ width: 80, margin: "0 auto" }} />
        <Text>© 2024 Firma Adı | www.firmawebsitesi.com | info@firma.com</Text>
      </View>
    </Page>
  </Document>
);

const OfferPDF = ({ offer }) => {
  const dispatch = useDispatch();

  const handleApproval = () => {
    dispatch(updateOfferStatus({ id: offer.id, status: "approved" }));
  };

  return (
    <div>
      <button onClick={handleApproval}>✅ Teklifi Onayla</button>
      <PDFDownloadLink
        document={<MyDocument offer={offer} />}
        fileName="teklif.pdf"
        style={{ padding: "10px", backgroundColor: "#4caf50", color: "#fff", textDecoration: "none" }}
      >
        📥 PDF İndir
      </PDFDownloadLink>
    </div>
  );
};

export default OfferPDF;
