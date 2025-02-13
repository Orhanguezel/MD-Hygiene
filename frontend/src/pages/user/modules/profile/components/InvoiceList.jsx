import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInvoices } from "@/features/invoices/invoicesSlice";
import { Section, InvoiceCard } from "../styles/profileStyles";

const InvoiceList = ({ userId }) => {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices.userInvoices);

  useEffect(() => {
    dispatch(fetchUserInvoices(userId));
  }, [dispatch, userId]);

  return (
    <Section>
      <h2>📄 Faturalarım</h2>
      {invoices.length > 0 ? (
        invoices.map((invoice) => (
          <InvoiceCard key={invoice.id}>
            <p><strong>Fatura ID:</strong> {invoice.id}</p>
            <p><strong>Tarih:</strong> {new Date(invoice.issuedAt).toLocaleDateString()}</p>
            <p><strong>Tutar:</strong> ${invoice.totalAmount.toFixed(2)}</p>
            <p><strong>Durum:</strong> {invoice.status}</p>
          </InvoiceCard>
        ))
      ) : (
        <p>Henüz bir faturaniz bulunmamaktadır.</p>
      )}
    </Section>
  );
};

export default InvoiceList;
