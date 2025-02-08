// ✅ generateOfferPDF.js
import jsPDF from "jspdf";
import "jspdf-autotable";

const generateOfferPDF = (offer) => {
  const doc = new jsPDF();

  // 📌 Başlık ve Firma Bilgileri
  doc.setFontSize(18);
  doc.text("Teklif Belgesi", 14, 20);
  doc.setFontSize(12);
  doc.text(`Teklif ID: ${offer.id}`, 14, 30);
  doc.text(`Müşteri: ${offer.user}`, 14, 38);
  doc.text(`Tarih: ${new Date().toLocaleDateString()}`, 14, 46);

  // 📦 Ürün Tablosu
  const items = offer.items.map((item) => [
    item.product,
    item.quantity,
    `${item.unitPrice} ₺`,
    `${item.quantity * item.unitPrice} ₺`
  ]);

  doc.autoTable({
    head: [["Ürün", "Miktar", "Birim Fiyat", "Toplam"]],
    body: items,
    startY: 55,
  });

  // 💰 Toplam Tutar
  const totalY = doc.lastAutoTable.finalY + 10;
  doc.text(`Toplam Tutar: ${offer.totalAmount} ₺`, 14, totalY);
  doc.text(`KDV: ${offer.taxAmount} ₺`, 14, totalY + 8);

  // 📥 PDF İndirme
  doc.save(`Teklif_${offer.id}.pdf`);
};

export default generateOfferPDF;
