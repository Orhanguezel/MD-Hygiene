import jsPDF from "jspdf";
import "jspdf-autotable";

export const generateOfferPDF = (offer) => {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text("📜 Teklif Belgesi", 14, 20);

  doc.setFontSize(12);
  doc.text(`Teklif No: ${offer._id}`, 14, 30);
  doc.text(`Tarih: ${new Date(offer.createdAt).toLocaleDateString()}`, 14, 40);
  doc.text(`Müşteri: ${offer.user.name} (${offer.user.email})`, 14, 50);

  const tableColumn = ["Ürün", "Adet", "Birim Fiyat (€)", "Toplam (€)"];
  const tableRows = offer.items.map(item => [
    item.product.name, 
    item.quantity, 
    `€${item.unitPrice.toFixed(2)}`, 
    `€${(item.quantity * item.unitPrice).toFixed(2)}`
  ]);

  doc.autoTable({ startY: 60, head: [tableColumn], body: tableRows });

  doc.setFontSize(14);
  doc.text(`Ara Toplam: €${offer.totalAmount.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);
  doc.text(`Vergi (19%): €${offer.taxAmount.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 20);
  doc.text(`Genel Toplam: €${(offer.totalAmount + offer.taxAmount).toFixed(2)}`, 14, doc.lastAutoTable.finalY + 30);

  doc.save(`Teklif_${offer._id}.pdf`);
};
