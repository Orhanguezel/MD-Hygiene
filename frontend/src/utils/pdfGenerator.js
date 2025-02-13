import jsPDF from "jspdf";
import "jspdf-autotable";
import companyInfo from "@/utils/companyInfo";
import { calculateInvoiceTotals } from "@/utils/invoiceUtils";
import { toast } from "react-toastify";

/**
 * 📄 Fatura PDF oluşturucu (Redux Store’dan fatura bilgisi kullanır)
 * @param {Object} invoiceData - Fatura verisi
 * @param {Object} texts - useLanguage tarafından sağlanan dil nesnesi
 */
export const generateInvoicePDF = (invoiceData, texts) => {
  if (!invoiceData?.items || invoiceData.items.length === 0) {
    toast.error(`❌ ${texts?.invoices?.missingData || "Fatura verisi eksik!"}`);
    console.error("❌ HATA: Fatura verisi eksik!", invoiceData);
    return;
  }

  // ✅ Vergi ve Toplam Hesaplamalar
  const totals = calculateInvoiceTotals(invoiceData.items);

  const doc = new jsPDF();
  doc.setFont("helvetica", "normal");

  // ✅ Firma Bilgileri
  doc.setFontSize(18).text(texts?.invoices?.title || "Fatura", 105, 20, null, null, "center");
  doc.setFontSize(10);
  doc.text(`${texts?.invoices?.company}: ${companyInfo?.name || texts?.invoices?.unknownCompany}`, 14, 30);
  doc.text(`${texts?.invoices?.address}: ${companyInfo?.address || "-"}`, 14, 36);
  doc.text(`${texts?.invoices?.taxNumber}: ${companyInfo?.taxNumber || "-"}`, 14, 42);
  doc.text(`${texts?.invoices?.tradeRegister}: ${companyInfo?.registrationNumber || "-"}`, 14, 48);
  doc.text(`${texts?.invoices?.iban}: ${companyInfo?.iban || "-"}`, 14, 54);
  doc.text(`${texts?.invoices?.bic}: ${companyInfo?.bic || "-"}`, 14, 60);

  // ✅ Müşteri Bilgileri
  doc.setFontSize(12).text(texts?.invoices?.customerInfo, 14, 70);
  doc.setFontSize(10);
  doc.text(`${texts?.invoices?.name}: ${invoiceData?.userName || texts?.invoices?.unknownCustomer}`, 14, 78);
  doc.text(`${texts?.invoices?.email}: ${invoiceData?.email || texts?.invoices?.noEmail}`, 14, 84);
  doc.text(`${texts?.invoices?.address}: ${invoiceData?.shippingAddress || texts?.invoices?.noAddress}`, 14, 90);

  // ✅ Ürün Tablosu
  const tableData = invoiceData.items.map((item, index) => [
    index + 1,
    item.product || texts?.invoices?.unknownProduct,
    item.quantity || "0",
    `${item.taxRate ? `${item.taxRate}%` : texts?.invoices?.noTax}`,
    `${item.unitPrice ? item.unitPrice.toFixed(2) : "0.00"} €`,
    `${(item.unitPrice * item.quantity).toFixed(2)} €`,
  ]);

  doc.autoTable({
    head: [[texts?.invoices?.num, texts?.invoices?.product, texts?.invoices?.quantity, texts?.invoices?.tax, texts?.invoices?.unitPrice, texts?.invoices?.total]],
    body: tableData,
    startY: 100,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185] },
  });

  doc.save(`${texts?.invoices?.invoiceFileName}-${invoiceData.invoiceNumber || texts?.invoices?.unknownInvoice}.pdf`);
  toast.success(`📄 ${texts?.invoices?.downloaded || "PDF başarıyla indirildi!"}`);
};
