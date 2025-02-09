import { useInvoices } from "@/features/invoices/useInvoices";   // ✅ RTK Invoices Yönetimi
import { useLanguage } from "@/features/language/useLanguage";   // ✅ RTK Dil Yönetimi
import { useTheme } from "@/features/theme/useTheme";            // ✅ RTK Tema Yönetimi
import { InvoicesContainer, InvoicesTable, Th, Td, StatusBadge, ActionButton } from "./styles/invoicesStyles";
import { Link } from "react-router-dom";

const Invoices = () => {
  const { invoices } = useInvoices();
  const { texts } = useLanguage();
  const { theme } = useTheme();

  return (
    <InvoicesContainer theme={theme}>
      <h1>{texts?.invoices?.title || "Faturalar"}</h1>
      
      <InvoicesTable theme={theme}>
        <thead>
          <tr>
            <Th theme={theme}>{texts?.invoices?.invoiceNumber || "Fatura No"}</Th>
            <Th theme={theme}>{texts?.invoices?.customer || "Müşteri"}</Th>
            <Th theme={theme}>{texts?.invoices?.date || "Tarih"}</Th>
            <Th theme={theme}>{texts?.invoices?.amount || "Tutar"}</Th>
            <Th theme={theme}>{texts?.invoices?.status || "Durum"}</Th>
            <Th theme={theme}>{texts?.invoices?.actions || "İşlemler"}</Th>
          </tr>
        </thead>
        
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <Td theme={theme}>{invoice.id || "-"}</Td>
              <Td theme={theme}>{invoice.customer || "Bilinmiyor"}</Td>
              <Td theme={theme}>{invoice.date || "-"}</Td>
              <Td theme={theme}>{invoice.amount || "0₺"}</Td>
              <Td theme={theme}>
                <StatusBadge theme={theme} status={invoice.status || "Bilinmiyor"}>
                  {invoice.status || texts?.invoices?.unknownStatus || "Bilinmiyor"}
                </StatusBadge>
              </Td>
              <Td theme={theme}>
                <Link to={`/invoices/${invoice.id}`}>
                  <ActionButton theme={theme}>
                    {texts?.invoices?.viewDetails || "Detayları Görüntüle"}
                  </ActionButton>
                </Link>
              </Td>
            </tr>
          ))}
        </tbody>
      </InvoicesTable>
    </InvoicesContainer>
  );
};

export default Invoices;
