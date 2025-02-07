import jsPDF from "jspdf";
import "jspdf-autotable";
import { sendInvoiceEmail } from "../api/emailApi";

export const generateInvoicePDF = async (invoice, token) => {
  const doc = new jsPDF();

  doc.text(`Fatura No: ${invoice.id}`, 10, 10);
  doc.text(`Tarih: ${invoice.date}`, 10, 20);
  doc.text(`Müşteri: ${invoice.customerName}`, 10, 30);
  doc.text(`Toplam Tutar: €${invoice.total}`, 10, 40);

  doc.autoTable({
    startY: 50,
    head: [["Ürün", "Miktar", "Birim Fiyat", "Toplam"]],
    body: invoice.items.map((item) => [
      item.productName,
      item.quantity,
      `€${item.unitPrice}`,
      `€${item.totalPrice}`,
    ]),
  });

  const pdfFile = doc.output("blob");
  await sendInvoiceEmail(invoice.id, token);
  
  return pdfFile;
};
