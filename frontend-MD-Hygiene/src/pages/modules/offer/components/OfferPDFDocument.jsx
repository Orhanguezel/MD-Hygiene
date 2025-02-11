import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useLanguage } from "@/features/language/useLanguage"; // ✅ Dil desteği eklendi

// PDF Stilleri
const styles = StyleSheet.create({
  page: { padding: 30, backgroundColor: "#fff" },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  section: { marginBottom: 10 },
  table: { display: "table", width: "100%", borderStyle: "solid", borderWidth: 1, marginBottom: 20 },
  tableRow: { flexDirection: "row", borderBottom: "1px solid #ccc" },
  tableCell: { flex: 1, padding: 5, fontSize: 10, textAlign: "center" },
  total: { marginTop: 10, fontSize: 12, textAlign: "right" },
  footer: { marginTop: 20, fontSize: 10, textAlign: "center", borderTop: "1px solid #ccc", paddingTop: 5 },
});

const OfferPDFDocument = ({ offer }) => {
  const { texts } = useLanguage(); // ✅ Dil kullanımı

  const calculateTotals = () => {
    const netTotal = offer.selectedProducts.reduce(
      (acc, item) => acc + item.customPrice * item.quantity,
      0
    );
    const taxTotal = offer.selectedProducts.reduce(
      (acc, item) => acc + item.customPrice * item.quantity * (item.taxRate / 100),
      0
    );
    const grandTotal = netTotal + taxTotal + Number(offer.shippingCost);

    return { netTotal, taxTotal, grandTotal };
  };

  const totals = calculateTotals();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>{texts?.offers?.detailsTitle || "📋 Teklif Detayları"}</Text>

        <View style={styles.section}>
          <Text>{texts?.offers?.companyName || "Firma"}: {offer.companyName}</Text>
          <Text>{texts?.offers?.customerName || "Müşteri"}: {offer.customerName}</Text>
          <Text>{texts?.offers?.status || "Durum"}: {offer.status}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{texts?.offers?.productName || "Ürün Adı"}</Text>
            <Text style={styles.tableCell}>{texts?.offers?.unitPrice || "Birim Fiyat (₺)"}</Text>
            <Text style={styles.tableCell}>{texts?.offers?.quantity || "Adet"}</Text>
            <Text style={styles.tableCell}>{texts?.offers?.taxRate || "KDV (%)"}</Text>
            <Text style={styles.tableCell}>{texts?.offers?.total || "Toplam (₺)"}</Text>
          </View>

          {offer.selectedProducts.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.customPrice.toFixed(2)}</Text>
              <Text style={styles.tableCell}>{item.quantity}</Text>
              <Text style={styles.tableCell}>{item.taxRate}%</Text>
              <Text style={styles.tableCell}>
                {(item.customPrice * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.total}>
          <Text>💰 {texts?.offers?.netTotal || "Net Tutar"}: {totals.netTotal.toFixed(2)} ₺</Text>
          <Text>💸 {texts?.offers?.taxTotal || "KDV Tutarı"}: {totals.taxTotal.toFixed(2)} ₺</Text>
          <Text>🚚 {texts?.offers?.shippingCost || "Nakliye Ücreti"}: {offer.shippingCost} ₺</Text>
          <Text>🔢 {texts?.offers?.grandTotal || "Genel Toplam"}: {totals.grandTotal.toFixed(2)} ₺</Text>
        </View>

        <View style={styles.footer}>
          <Text>{texts?.offers?.footerInfo || "MD-Hygienelogistik | info@firma.com"}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default OfferPDFDocument; 
