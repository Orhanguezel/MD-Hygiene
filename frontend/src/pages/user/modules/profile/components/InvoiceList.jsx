import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInvoices } from "@/features/invoices/invoicesSlice"; // ✅ fetchUserInvoices yerine fetchInvoices kullanılıyor
import { generateInvoicePDF } from "@/utils/pdfGenerator";
import { useLanguage } from "@/features/language/useLanguage";
import { toast } from "react-toastify";
import { Section, InvoiceCard, ActionButton } from "../styles/profileStyles";

const InvoiceList = ({ userId }) => {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices.invoices) || []; // ✅ Tüm faturalar
  const status = useSelector((state) => state.invoices.status);
  const userData = useSelector((state) => state.auth.user);
  const { texts } = useLanguage(); 

  useEffect(() => {
    dispatch(fetchInvoices()); // ✅ Tüm faturaları getir
  }, [dispatch]);

  // ✅ Kullanıcının faturalarını filtrele
  const userInvoices = invoices.filter((invoice) => invoice.userId === userId);

  const handleDownloadPDF = (invoice) => {
    if (!userData) {
      toast.error(texts.invoice.missingData);
      return;
    }
    generateInvoicePDF(invoice, userData, texts); 
    toast.success(texts.invoice.downloaded);
  };

  return (
    <Section>
      <h2>{texts.invoice.invoices}</h2>

      {status === "loading" ? (
        <p>📦 {texts.invoice.loading}</p>
      ) : userInvoices.length > 0 ? (
        userInvoices.map((invoice) => (
          <InvoiceCard key={invoice.id}>
            <p><strong>{texts.invoice.invoiceID}:</strong> {invoice.id}</p>
            <p><strong>{texts.invoice.date}:</strong> {new Date(invoice.issuedAt).toLocaleDateString()}</p>
            <p><strong>{texts.invoice.totalAmount}:</strong> ${invoice.totalAmount.toFixed(2)}</p>
            <p><strong>{texts.invoice.status}:</strong> {invoice.status}</p>
            <ActionButton onClick={() => handleDownloadPDF(invoice)}>
              {texts.invoice.downloadPDF}
            </ActionButton>
          </InvoiceCard>
        ))
      ) : (
        <p>⚠️ {texts.invoice.noInvoices}</p>
      )}
    </Section>
  );
};

export default InvoiceList;
