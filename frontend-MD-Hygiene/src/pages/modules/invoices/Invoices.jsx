
// ✅ Invoices.jsx
import { useInvoices } from "@/context/InvoicesContext";
import { useLanguage } from "@/context/LanguageContext";
import { InvoicesContainer, InvoicesTable, Th, Td, StatusBadge, ActionButton } from "./styles/invoicesStyles";

import { Link } from "react-router-dom";

const Invoices = () => {
  const { invoices } = useInvoices();
  const { texts } = useLanguage();

  return (
    <InvoicesContainer>
      <h1>{texts.invoices.title}</h1>
      <InvoicesTable>
        <thead>
          <tr>
            <Th>{texts.invoices.invoiceNumber}</Th>
            <Th>{texts.invoices.customer}</Th>
            <Th>{texts.invoices.date}</Th>
            <Th>{texts.invoices.amount}</Th>
            <Th>{texts.invoices.status}</Th>
            <Th>{texts.invoices.actions}</Th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <Td>{invoice.id}</Td>
              <Td>{invoice.customer}</Td>
              <Td>{invoice.date}</Td>
              <Td>{invoice.amount}</Td>
              <Td>
                <StatusBadge status={invoice.status}>{invoice.status}</StatusBadge>
              </Td>
              <Td>
                <Link to={`/invoices/${invoice.id}`}>
                  <ActionButton>{texts.invoices.viewDetails}</ActionButton>
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