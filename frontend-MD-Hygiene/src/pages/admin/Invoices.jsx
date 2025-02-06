import { InvoicesContainer, InvoicesTable, Th, Td, ActionButton } from "../../styles/invoicesStyles";
import { useLanguage } from "../../context/LanguageContext";

const Invoices = () => {
  const { texts } = useLanguage();

  const dummyInvoices = [
    { id: "INV-001", customer: "Ali Veli", date: "2024-04-01", total: "250 ₺" },
    { id: "INV-002", customer: "Ayşe Yılmaz", date: "2024-04-02", total: "150 ₺" },
    { id: "INV-003", customer: "Mehmet Demir", date: "2024-04-03", total: "300 ₺" },
  ];

  return (
    <InvoicesContainer>
      <h1>{texts.invoices.title}</h1>
      <InvoicesTable>
        <thead>
          <tr>
            <Th>{texts.invoices.invoiceNumber}</Th>
            <Th>{texts.invoices.customer}</Th>
            <Th>{texts.invoices.date}</Th>
            <Th>{texts.invoices.total}</Th>
            <Th>{texts.invoices.actions}</Th>
          </tr>
        </thead>
        <tbody>
          {dummyInvoices.map((invoice) => (
            <tr key={invoice.id}>
              <Td>{invoice.id}</Td>
              <Td>{invoice.customer}</Td>
              <Td>{invoice.date}</Td>
              <Td>{invoice.total}</Td>
              <Td>
                <ActionButton>{texts.invoices.viewDetails}</ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </InvoicesTable>
    </InvoicesContainer>
  );
};

export default Invoices;
