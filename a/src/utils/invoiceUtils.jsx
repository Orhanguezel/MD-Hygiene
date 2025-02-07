import jsPDF from "jspdf";
import "jspdf-autotable";

export const generateInvoicePDF = (order) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Fatura", 14, 20);
  doc.setFontSize(12);
  doc.text(`Fatura No: INV-${order.id}`, 14, 30);
  doc.text(`Müşteri: ${order.customerName}`, 14, 40);
  doc.text(`Tarih: ${order.date}`, 14, 50);
  doc.text(`Toplam: €${order.total}`, 14, 60);
  doc.text(`Durum: ${order.status}`, 14, 70);

  const columns = ["Ürün", "Adet", "Fiyat (€)", "Toplam (€)"];
  const rows = order.products.map((product) => [
    product.name,
    product.quantity,
    product.unitPrice.toFixed(2),
    (product.quantity * product.unitPrice).toFixed(2),
  ]);

  doc.autoTable({
    startY: 80,
    head: [columns],
    body: rows,
  });

  doc.save(`Fatura_INV-${order.id}.pdf`);
};
