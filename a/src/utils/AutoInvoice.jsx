import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { getInvoices } from "../../api/invoiceApi";
import { generateInvoicePDF } from "./invoiceUtils";
import {
  Table,
  TableRow,
  TableHeader,
  TableData,
  DownloadButton,
} from "../../styles/dashboardStyles";

const AutoInvoice = () => {
  const { user } = useContext(AuthContext);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      if (!user?.token) return;
      try {
        const data = await getInvoices(user.token);
        setInvoices(data);
      } catch (error) {
        console.error("Faturalar alınamadı:", error);
      }
    };

    fetchInvoices();
  }, [user]);

  return (
    <div>
      <h3>📜 Otomatik Faturalandırma</h3>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Fatura No</TableHeader>
            <TableHeader>Müşteri</TableHeader>
            <TableHeader>Toplam (€)</TableHeader>
            <TableHeader>İşlemler</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableData>{invoice.id}</TableData>
              <TableData>{invoice.customerName}</TableData>
              <TableData>€{invoice.total}</TableData>
              <TableData>
                <DownloadButton onClick={() => generateInvoicePDF(invoice, user.token)}>PDF Gönder</DownloadButton>
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AutoInvoice;
