import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchInvoiceById } from "@/features/invoices/invoicesSlice";
import { fetchCompanyInfo } from "@/features/company/companySlice";
import generateInvoicePDF from "./pdfGenerator";
import { toast } from "react-toastify";
import { useLanguage } from "@/features/language/useLanguage"; // ✅ Dil yönetimi eklendi

const InvoiceDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { texts } = useLanguage(); // ✅ Metinleri `texts` üzerinden çekiyoruz

  const invoiceData = useSelector((state) => state.invoices.selectedInvoice);
  const company = useSelector((state) => state.company.company);
  const status = useSelector((state) => state.invoices.status);

  useEffect(() => {
    if (id) {
      console.log("📌 Fatura Detay Sayfası - ID:", id);
      dispatch(fetchInvoiceById(id));
      dispatch(fetchCompanyInfo()); // ✅ Şirket bilgisi dinamik olarak çekiliyor
    } else {
      console.error("🚨 HATA: Fatura ID alınamadı!");
    }
  }, [dispatch, id]);

  if (status === "loading") return <p>📄 {texts?.invoices?.loading || "Fatura yükleniyor..."}</p>;
  if (!invoiceData) return <p>❌ {texts?.invoices?.notFound || "Fatura bulunamadı!"}</p>;

  const handlePDFDownload = () => {
    if (!invoiceData || !company) {
      toast.error(`❌ ${texts?.invoices?.pdfError || "Hata: Fatura veya şirket bilgisi eksik!"}`);
      return;
    }
    generateInvoicePDF(invoiceData, company);
    toast.success(`📄 ${texts?.invoices?.pdfSuccess || "Fatura PDF başarıyla oluşturuldu!"}`);
  };

  return (
    <div>
      <h1>🧾 {texts?.invoices?.details || "Fatura Detayları"}</h1>
      <p><strong>{texts?.invoices?.invoiceNumber || "Fatura No"}:</strong> {invoiceData.invoiceNumber}</p>
      <p><strong>{texts?.invoices?.date || "Tarih"}:</strong> {invoiceData.issuedAt}</p>
      <p><strong>{texts?.invoices?.customer || "Müşteri"}:</strong> {invoiceData.user.name}</p>
      <p><strong>{texts?.invoices?.total || "Toplam Tutar"}:</strong> €{invoiceData.totalAmount}</p>
      <button onClick={handlePDFDownload}>📄 {texts?.invoices?.downloadPdf || "Fatura PDF İndir"}</button>
    </div>
  );
};

export default InvoiceDetails;
