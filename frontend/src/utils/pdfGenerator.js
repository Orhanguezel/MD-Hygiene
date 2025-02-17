import jsPDF from "jspdf";
import "jspdf-autotable";



export const generateInvoicePDF = (invoiceData) => {
  const doc = new jsPDF();

  // ✅ Şirket Logosu
  const logoPath = "/logo.png"; // LOGOYU DEĞİŞTİRMEDİK!
  doc.addImage(logoPath, "PNG", 150, 10, 40, 20);

  // ✅ Başlık
  doc.setFontSize(16);
  doc.text("Rechnung", 105, 30, { align: "center" });

  // ✅ Şirket Bilgileri
  doc.setFontSize(10);
  doc.text("MD-Hygienelogistik GmbH", 20, 40);
  doc.text("Adresse: Musterstraße 123, 40210 Düsseldorf, Germany", 20, 45);
  doc.text("Steuernummer: DE123456789", 20, 50);
  doc.text("Handelsregister-Nr.: HRB 987654", 20, 55);
  doc.text("IBAN: DE89 3704 0044 0532 0130 00", 20, 60);
  doc.text("BIC: COBADEFFXXX", 20, 65);

  // ✅ Müşteri Bilgileri
  doc.setFontSize(12);
  doc.text("Kundeninformationen", 20, 75);
  doc.setFontSize(10);
  doc.text(`Name: ${invoiceData.userName}`, 20, 80);
  doc.text(`E-Mail: ${invoiceData.userEmail}`, 20, 85);
  doc.text(`Adresse: ${invoiceData.userAddress}`, 20, 90);

  // ✅ Ürün Tablosu
  const tableColumn = ["#", "Produkt", "Menge", "Steuer (%)", "Netto", "Steuerbetrag", "Brutto"];
  const tableRows = [];

  let totalNet = 0;
  let totalTax = 0;

  invoiceData.items.forEach((item, index) => {
    const netPrice = (item.unitPrice / (1 + item.taxRate / 100)).toFixed(2);
    const taxAmount = (item.unitPrice - netPrice).toFixed(2);

    totalNet += parseFloat(netPrice);
    totalTax += parseFloat(taxAmount);

    tableRows.push([
      index + 1,
      item.title,
      item.quantity,
      `${item.taxRate}%`,
      `${netPrice} EUR`,
      `${taxAmount} EUR`,
      `${item.unitPrice.toFixed(2)} EUR`,
    ]);
  });

  // ✅ Tabloyu Ekle
  doc.autoTable({
    startY: 95,
    head: [tableColumn],
    body: tableRows,
    theme: "grid",
  });

  // ✅ Vergi & Kargo & Toplam Hesaplama
  const shippingCost = invoiceData.shippingCost || 0;
  const totalAmount = totalNet + totalTax + shippingCost;

  doc.text(`Versandkosten: ${shippingCost.toFixed(2)} EUR`, 20, doc.autoTable.previous.finalY + 10);
  doc.text(`Steuerbetrag: ${totalTax.toFixed(2)} EUR`, 20, doc.autoTable.previous.finalY + 15);
  doc.text(`Gesamtsumme: ${totalAmount.toFixed(2)} EUR`, 20, doc.autoTable.previous.finalY + 20);

  // ✅ "Örnek Fatura" Uyarısı
  doc.setTextColor(255, 0, 0);
  doc.text("Dies ist eine Beispielrechnung und nicht rechtsgültig.", 20, doc.autoTable.previous.finalY + 30);

  // ✅ PDF İndirme
  doc.save(`Rechnung_${invoiceData.invoiceNumber}.pdf`);
};
