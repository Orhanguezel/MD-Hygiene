import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInvoices } from "@/features/invoices/invoicesSlice";
import { generateInvoicePDF } from "@/utils/pdfGenerator";
import { useLanguage } from "@/features/language/useLanguage";
import { toast } from "react-toastify";
import { Section, InvoiceCard, ActionButton } from "../styles/profileStyles";

const InvoiceList = ({ userId }) => {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices.userInvoices) || [];
  const status = useSelector((state) => state.invoices.status);
  const userData = useSelector((state) => state.auth.user);
  const { texts } = useLanguage(); // ✅ useLanguage Hook'u burada çağırıldı!

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserInvoices(userId));
    }
  }, [dispatch, userId]);

  const handleDownloadPDF = (invoice) => {
    if (!userData) {
      toast.error(texts.invoice.missingData);
      return;
    }
    generateInvoicePDF(invoice, userData, texts); // ✅ texts parametre olarak geçildi
    toast.success(texts.invoice.downloaded);
  };

  return (
    <Section>
      <h2>{texts.invoice.invoices}</h2>

      {status === "loading" ? (
        <p>📦 {texts.invoice.loading}</p>
      ) : invoices.length > 0 ? (
        invoices.map((invoice) => (
          <InvoiceCard key={invoice.id}>
            <p><strong>{texts.invoice.invoiceID}:</strong> {invoice.id}</p>
            <p><strong>{texts.invoice.date}:</strong> {new Date(invoice.issuedAt).toLocaleDateString()}</p>
            <p><strong>{texts.invoice.totalAmount}:</strong> ${invoice.totalAmount.toFixed(2)}</p>
            <p><strong>{texts.invoice.status}:</strong> {invoice.status}</p>
            <ActionButton onClick={() => handleDownloadPDF(invoice)}>
              📄 {texts.invoice.downloadPDF}
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
