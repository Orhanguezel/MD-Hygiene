import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const safeText = (text) => text ? String(text) : "N/A";

const generateOfferPDF = (offerData, company, customers) => {
  if (!offerData || !company || customers.length === 0) {
    console.error("❌ PDF oluşturmak için eksik veri var!");
    return;
  }

  // ✅ Redux'tan çekilen müşteri bilgileri
  const customer = customers.find(c => c.id === offerData.customerId) || {};

  const doc = new jsPDF({ unit: "mm", format: "a4" });

  // ✅ Logo Ekle
  doc.addImage("/logo.png", "PNG", 150, 10, 40, 20);

  // ✅ Firma Bilgileri
  doc.setFontSize(10);
  doc.text(safeText(company.name), 20, 20);
  doc.text(safeText(company.address), 20, 25);
  doc.text("Vergi No: " + safeText(company.taxNumber), 20, 30);
  doc.text("IBAN: " + safeText(company.bankIban), 20, 35);
  doc.text("BIC: " + safeText(company.bankBic), 20, 40);
  doc.text("E-Mail: " + safeText(company.email), 20, 45);

  // ✅ Müşteri Bilgileri
  doc.text("Müşteri Bilgileri", 20, 55);
  doc.text("Müşteri Adı: " + safeText(customer.contactPerson), 20, 60);
  doc.text("Firma Adı: " + safeText(customer.companyName), 20, 65);
  doc.text("Adres: " + safeText(customer.address), 20, 70);
  doc.text("Telefon: " + safeText(customer.phone), 20, 75);

  // ✅ Ürün Tablosu
  autoTable(doc, {
    startY: 85,
    head: [["Ürün", "Adet", "Fiyat", "KDV (%)", "Toplam"]],
    body: offerData.selectedProducts.map((product) => [
      safeText(product.title),
      safeText(product.quantity),
      `${parseFloat(product.customPrice).toFixed(2)} ₺`,
      `${parseFloat(product.taxRate)}%`,
      `${(parseFloat(product.customPrice) * parseFloat(product.quantity)).toFixed(2)} ₺`,
    ]),
    styles: { fontSize: 10, cellPadding: 4 },
    headStyles: { fillColor: [0, 0, 0], textColor: "#FFFFFF" },
  });

  // ✅ Toplamlar
  const netTotal = offerData.selectedProducts.reduce((acc, item) => acc + parseFloat(item.customPrice) * parseFloat(item.quantity), 0);
  const vatAmount = netTotal * (19 / 100);
  const shippingCost = parseFloat(offerData.shippingCost);
  const totalBrutto = netTotal + vatAmount + shippingCost;

  doc.text("Net Tutar: " + netTotal.toFixed(2) + " ₺", 120, doc.autoTable.previous.finalY + 10);
  doc.text("KDV (%19): " + vatAmount.toFixed(2) + " ₺", 120, doc.autoTable.previous.finalY + 20);
  doc.text("Nakliye Ücreti: " + shippingCost.toFixed(2) + " ₺", 120, doc.autoTable.previous.finalY + 30);
  doc.text("Genel Toplam: " + totalBrutto.toFixed(2) + " ₺", 120, doc.autoTable.previous.finalY + 40);

  doc.save(`Teklif_${offerData.offerNumber}.pdf`);
};

export default generateOfferPDF;
