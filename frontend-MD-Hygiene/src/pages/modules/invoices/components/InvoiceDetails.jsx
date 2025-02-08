// ✅ InvoiceDetails.jsx
import { useParams } from "react-router-dom";
import { useInvoices } from "@/context/InvoicesContext";
import { InvoiceDetailsContainer, InvoiceInfo, ItemList, Item } from "../styles/invoicesStyles";

const InvoiceDetails = () => {
  const { id } = useParams();
  const { invoices } = useInvoices();
  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) return <p>Fatura bulunamadı!</p>;

  return (
    <InvoiceDetailsContainer>
      <h1>Fatura Detayları</h1>
      <InvoiceInfo>
        <p><strong>Fatura No:</strong> {invoice.id}</p>
        <p><strong>Müşteri:</strong> {invoice.customer}</p>
        <p><strong>Tarih:</strong> {invoice.date}</p>
        <p><strong>Toplam Tutar:</strong> {invoice.amount}</p>
        <p><strong>Durum:</strong> {invoice.status}</p>
      </InvoiceInfo>

      <h2>Ürünler</h2>
      <ItemList>
        {invoice.items.map((item, index) => (
          <Item key={index}>
            <p>{item.description}</p>
            <p>Adet: {item.quantity}</p>
            <p>Fiyat: {item.price} ₺</p>
          </Item>
        ))}
      </ItemList>
    </InvoiceDetailsContainer>
  );
};

export default InvoiceDetails;
