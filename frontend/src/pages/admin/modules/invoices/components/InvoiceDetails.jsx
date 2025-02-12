import { useParams } from "react-router-dom";
import { useInvoices } from "@/features/invoices/useInvoices";   // ✅ RTK Fatura Yönetimi
import { useLanguage } from "@/features/language/useLanguage";   // ✅ RTK Dil Yönetimi
import { useTheme } from "@/features/theme/useTheme";            // ✅ RTK Tema Yönetimi
import { InvoiceDetailsContainer, InvoiceInfo, ItemList, Item, StatusBadge } from "../styles/invoicesStyles";

const InvoiceDetails = () => {
  const { id } = useParams();
  const { invoices } = useInvoices();
  const { texts } = useLanguage();
  const { theme } = useTheme();

  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) {
    return (
      <InvoiceDetailsContainer theme={theme}>
        <p>{texts?.invoices?.notFound || "Fatura bulunamadı!"}</p>
      </InvoiceDetailsContainer>
    );
  }

  return (
    <InvoiceDetailsContainer theme={theme}>
      <h1>{texts?.invoices?.detailsTitle || "Fatura Detayları"}</h1>
      <InvoiceInfo theme={theme}>
        <p>
          <strong>{texts?.invoices?.invoiceNumber || "Fatura No"}:</strong> {invoice.id}
        </p>
        <p>
          <strong>{texts?.invoices?.customer || "Müşteri"}:</strong> {invoice.customer}
        </p>
        <p>
          <strong>{texts?.invoices?.date || "Tarih"}:</strong> {invoice.date}
        </p>
        <p>
          <strong>{texts?.invoices?.amount || "Toplam Tutar"}:</strong> {invoice.amount} ₺
        </p>
        <p>
          <strong>{texts?.invoices?.status || "Durum"}:</strong>{" "}
          <StatusBadge theme={theme} status={invoice.status}>
            {invoice.status}
          </StatusBadge>
        </p>
      </InvoiceInfo>

      <h2>{texts?.invoices?.products || "Ürünler"}</h2>
      <ItemList theme={theme}>
        {invoice.items.map((item, index) => (
          <Item key={index} theme={theme}>
            <p>{item.description}</p>
            <p>
              {texts?.invoices?.quantity || "Adet"}: {item.quantity}
            </p>
            <p>
              {texts?.invoices?.price || "Fiyat"}: {item.price} ₺
            </p>
          </Item>
        ))}
      </ItemList>
    </InvoiceDetailsContainer>
  );
};

export default InvoiceDetails;
