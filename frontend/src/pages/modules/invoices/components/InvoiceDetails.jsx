import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchInvoiceById } from "@/features/invoices/invoicesSlice";
import { fetchCompanyInfo } from "@/features/company/companySlice"; // ✅ Şirket bilgilerini getiriyoruz
import generateInvoicePDF from "./pdfGenerator";
import { toast } from "react-toastify";

const InvoiceDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const invoiceData = useSelector((state) => state.invoices.selectedInvoice);
  const company = useSelector((state) => state.company.company);
  const status = useSelector((state) => state.invoices.status);

  useEffect(() => {
    dispatch(fetchInvoiceById(id));
    dispatch(fetchCompanyInfo()); // ✅ Şirket bilgilerini yükle
  }, [dispatch, id]);

  if (status === "loading") return <p>📄 Fatura yükleniyor...</p>;
  if (!invoiceData) return <p>❌ Fatura bulunamadı!</p>;

  // ✅ PDF İndirme Butonu
  const handlePDFDownload = () => {
    if (!invoiceData || !company) {
      toast.error("❌ HATA: Fatura veya şirket bilgisi eksik!");
      return;
    }
    generateInvoicePDF(invoiceData, company);
    toast.success("📄 Fatura PDF başarıyla oluşturuldu!");
  };

  return (
    <div>
      <h1>🧾 Fatura Detayları</h1>
      <p><strong>Fatura No:</strong> {invoiceData.invoiceNumber}</p>
      <p><strong>Tarih:</strong> {invoiceData.issuedAt}</p>
      <p><strong>Müşteri:</strong> {invoiceData.userName}</p>
      <p><strong>E-Mail:</strong> {invoiceData.userEmail}</p>
      <p><strong>Toplam Tutar:</strong> {invoiceData.totalAmount} €</p>

      <button onClick={handlePDFDownload}>📄 Fatura PDF İndir</button>
    </div>
  );
};

export default InvoiceDetails;
