import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInvoices } from "@/features/invoices/invoicesSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  InvoicesContainer,
  InvoicesTable,
  Th,
  Td,
  StatusBadge,
  ActionButton,
} from "./styles/invoicesStyles";

const Invoices = () => {
  const dispatch = useDispatch();
  const { invoices, status, error } = useSelector((state) => state.invoices);
  const { texts } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(fetchInvoices()); // ✅ API'den faturaları getir
  }, [dispatch]);

  if (status === "loading") return <p>📦 {texts?.invoices?.loading || "Faturalar yükleniyor..."}</p>;
  if (status === "failed") {
    toast.error(texts?.invoices?.error || "Bir hata oluştu!");
    return <p>{error}</p>;
  }

  return (
    <InvoicesContainer theme={theme}>
      <h1>{texts?.invoices?.title || "Faturalar"}</h1>

      <InvoicesTable theme={theme}>
        <thead>
          <tr>
            <Th>{texts?.invoices?.invoiceNumber || "Fatura No"}</Th>
            <Th>{texts?.invoices?.customer || "Müşteri"}</Th>
            <Th>{texts?.invoices?.date || "Tarih"}</Th>
            <Th>{texts?.invoices?.amount || "Tutar"}</Th>
            <Th>{texts?.invoices?.status || "Durum"}</Th>
            <Th>{texts?.invoices?.actions || "İşlemler"}</Th>
          </tr>
        </thead>
        <tbody>
          {invoices.length > 0 ? (
            invoices.map((invoice) => (
              <tr key={invoice.id}>
                <Td>{invoice.invoiceNumber}</Td>
                <Td>{invoice.userName || "Bilinmiyor"}</Td>
                <Td>{new Date(invoice.issuedAt).toLocaleDateString()}</Td>
                <Td>€{Number(invoice.totalAmount || 0).toFixed(2)}</Td>
                <Td>
                  <StatusBadge theme={theme} $status={invoice.status}>
                    {texts?.invoices?.[invoice.status] || invoice.status}
                  </StatusBadge>
                </Td>
                <Td>
                  <Link to={`/invoices/${invoice.id}`}>
                    <ActionButton theme={theme}>🔍 {texts?.invoices?.viewDetails || "Detayları Gör"}</ActionButton>
                  </Link>
                </Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan="6">{texts?.invoices?.noInvoices || "Henüz fatura yok."}</Td>
            </tr>
          )}
        </tbody>
      </InvoicesTable>
    </InvoicesContainer>
  );
};

export default Invoices;
