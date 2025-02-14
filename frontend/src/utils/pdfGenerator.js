import jsPDF from "jspdf";
import "jspdf-autotable";

/**
 * 📄 Fatura PDF oluşturucu
 * @param {Object} invoiceData - Fatura verisi
 * @param {Object} texts - Çeviri metinleri
 */
export const generateInvoicePDF = (invoiceData, texts) => {
  if (!invoiceData?.items || invoiceData.items.length === 0) {
    console.error("❌ HATA: Fatura verisi eksik!", invoiceData);
    return;
  }

  // ✅ Vergi ve Toplam Hesaplamalar
  const doc = new jsPDF();
  doc.setFont("helvetica", "normal");

  // 📌 Şirket Bilgileri
  doc.setFontSize(16).text(texts?.invoices?.title || "Fatura", 105, 20, null, null, "center");
  doc.setFontSize(10);
  doc.text(`${texts?.invoices?.company}: MD-Hygienelogistik GmbH`, 14, 30);
  doc.text(`${texts?.invoices?.address}: Musterstraße 123, 40210 Düsseldorf, Germany`, 14, 36);
  doc.text(`${texts?.invoices?.taxNumber}: DE123456789`, 14, 42);
  doc.text(`${texts?.invoices?.tradeRegister}: HRB 987654`, 14, 48);
  doc.text(`${texts?.invoices?.iban}: DE89 3704 0044 0532 0130 00`, 14, 54);
  doc.text(`${texts?.invoices?.bic}: COBADEFFXXX`, 14, 60);

  // 📌 Müşteri Bilgileri
  doc.setFontSize(12).text(texts?.invoices?.customerInfo, 14, 70);
  doc.setFontSize(10);
  doc.text(`${texts?.invoices?.name}: ${invoiceData?.userName}`, 14, 78);
  doc.text(`${texts?.invoices?.email}: ${invoiceData?.userEmail}`, 14, 84);
  doc.text(`${texts?.invoices?.address}: ${invoiceData?.userAddress}`, 14, 90);

  // 📌 Ürün Tablosu
  const tableData = invoiceData.items.map((item, index) => [
    index + 1,
    item.title,
    item.quantity,
    `${item.taxRate}%`,
    `${(item.unitPrice / 1.19).toFixed(2)} EUR`,
    `${((item.unitPrice / 1.19) * 0.19).toFixed(2)} EUR`,
    `${(item.unitPrice / 1.19).toFixed(2)} EUR`,
    `${((item.unitPrice / 1.19) * 0.19).toFixed(2)} EUR`,
    `${item.unitPrice.toFixed(2)} EUR`,
  ]);

  doc.autoTable({
    head: [[
      texts?.invoices?.num,
      texts?.invoices?.product,
      texts?.invoices?.quantity,
      texts?.invoices?.tax,
      texts?.invoices?.netPrice,
      texts?.invoices?.totalTax,
      texts?.invoices?.netTotal,
      texts?.invoices?.totalVAT,
      texts?.invoices?.total,
    ]],
    body: tableData,
    startY: 100,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185] },
  });

  // 📌 Kargo Ücreti ve Genel Toplam
  const yPosition = doc.lastAutoTable.finalY + 10;
  doc.text(`${texts?.invoices?.shipping}: ${invoiceData.shippingCost.toFixed(2)} EUR`, 14, yPosition);
  doc.text(`${texts?.invoices?.totalAmount}: ${invoiceData.totalAmount.toFixed(2)} EUR`, 14, yPosition + 6);

  // 📌 ÖRNEK DAMGASI
  doc.setTextColor(255, 0, 0);
  doc.setFontSize(12);
  doc.text("Dies ist eine Beispielrechnung und nicht rechtsgültig.", 14, yPosition + 12);

  // 📌 Şirket Logosu
  const logoURL = "/logo.png"; // Public klasöründe olması gerekiyor
  const imgWidth = 40;
  const imgHeight = 20;
  doc.addImage(logoURL, "PNG", 150, 10, imgWidth, imgHeight);

  // 📌 PDF İndir
  doc.save(`Rechnung-${invoiceData.invoiceNumber}.pdf`);
};
