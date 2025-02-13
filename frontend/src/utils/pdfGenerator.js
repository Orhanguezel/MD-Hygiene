import jsPDF from "jspdf";
import "jspdf-autotable";
import companyInfo from "@/utils/companyInfo";


export const generateInvoicePDF = (invoiceData, userData) => {
  if (!invoiceData?.items || invoiceData.items.length === 0) {
    console.error("❌ HATA: Fatura ürünleri eksik!", { invoiceData });
    alert("❌ Bu faturada ürün bulunamadığı için PDF oluşturulamadı.");
    return;
  }

  if (!userData) {
    console.error("❌ HATA: Kullanıcı verisi eksik!", { userData });
    alert("❌ Kullanıcı bilgileri eksik olduğu için PDF oluşturulamadı.");
    return;
  }

  const doc = new jsPDF();
  doc.setFont("helvetica", "normal"); // ✅ Türkçe karakter desteği

  // ✅ Firma Bilgileri
  doc.setFontSize(18).text("Fatura", 105, 20, null, null, "center");
  doc.setFontSize(10);
  doc.text(`Firma: ${companyInfo?.name || "Firma Bilinmiyor"}`, 14, 30);
  doc.text(`Adres: ${companyInfo?.address || "-"}`, 14, 36);
  doc.text(`Vergi No: ${companyInfo?.taxNumber || "-"}`, 14, 42);
  doc.text(`Ticaret Sicil No: ${companyInfo?.registrationNumber || "-"}`, 14, 48);
  doc.text(`IBAN: ${companyInfo?.iban || "-"}`, 14, 54);
  doc.text(`BIC: ${companyInfo?.bic || "-"}`, 14, 60);

  // ✅ Müşteri Bilgileri
  doc.setFontSize(12).text("Müşteri Bilgileri", 14, 70);
  doc.setFontSize(10);
  const customerName = userData?.name || invoiceData?.userName || "Bilinmiyor";
  const customerEmail = userData?.email || "E-posta bulunamadı";
  const customerAddress = userData?.address || invoiceData?.shippingAddress || "Adres bulunamadı";

  doc.text(`Adı: ${customerName}`, 14, 78);
  doc.text(`E-Posta: ${customerEmail}`, 14, 84);
  doc.text(`Adres: ${customerAddress}`, 14, 90);

  // ✅ Ürün Tablosu
  const tableData = invoiceData.items.map((item, index) => [
    index + 1,
    item.product || "Ürün Bilinmiyor",
    item.quantity || "0",
    `${item.taxRate ? `${item.taxRate}%` : "Vergi Yok"}`,
    `${item.unitPrice ? item.unitPrice.toFixed(2) : "0.00"} €`,
    `${item.unitPrice && item.quantity ? (item.quantity * item.unitPrice).toFixed(2) : "0.00"} €`,
  ]);

  doc.autoTable({
    head: [["#", "Ürün", "Adet", "Vergi (%)", "Birim Fiyat", "Toplam"]],
    body: tableData,
    startY: 100,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185] },
  });

  // ✅ Vergi ve Toplam Hesaplamalar
  const total = invoiceData.totalAmount ? invoiceData.totalAmount.toFixed(2) : "0.00";
  const totalTax = invoiceData.taxAmount ? invoiceData.taxAmount.toFixed(2) : "0.00";
  const shippingCost = invoiceData.shippingCost ? invoiceData.shippingCost.toFixed(2) : "0.00";
  const grandTotal = (parseFloat(total) + parseFloat(totalTax) + parseFloat(shippingCost)).toFixed(2);

  doc.text(`Toplam: ${total} €`, 14, doc.autoTable.previous.finalY + 10);
  doc.text(`Toplam KDV: ${totalTax} €`, 14, doc.autoTable.previous.finalY + 16);
  doc.text(`Nakliye Ücreti: ${shippingCost} €`, 14, doc.autoTable.previous.finalY + 22);
  doc.setFont("helvetica", "bold").text(`Genel Toplam: ${grandTotal} €`, 14, doc.autoTable.previous.finalY + 28);

  // ✅ PDF İndirme
  doc.save(`Rechnung-${invoiceData.invoiceNumber || "Bilinmiyor"}.pdf`);
};
