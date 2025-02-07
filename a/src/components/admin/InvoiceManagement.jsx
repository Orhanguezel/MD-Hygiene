import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { getInvoices, sendInvoiceReminder } from "../../api/invoiceApi";
import { generateInvoicePDF } from "../../utils/invoiceUtils";
import {
  Table,
  TableRow,
  TableHeader,
  TableData,
  DownloadButton,
  ReminderButton,
} from "../../styles/dashboardStyles";

const InvoiceManagement = () => {
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

  const handleDownloadInvoice = (invoice) => {
    generateInvoicePDF(invoice);
  };

  const handleSendReminder = async (invoiceId) => {
    try {
      await sendInvoiceReminder(invoiceId, user.token);
      alert("Ödeme hatırlatması gönderildi!");
    } catch (error) {
      console.error("Ödeme hatırlatma gönderilemedi:", error);
    }
  };

  return (
    <div>
      <h3>📜 Faturalandırma Yönetimi</h3>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Fatura No</TableHeader>
            <TableHeader>Müşteri</TableHeader>
            <TableHeader>Toplam (€)</TableHeader>
            <TableHeader>Durum</TableHeader>
            <TableHeader>İşlemler</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableData>{invoice.id}</TableData>
              <TableData>{invoice.customerName}</TableData>
              <TableData>€{invoice.total}</TableData>
              <TableData>{invoice.status}</TableData>
              <TableData>
                <DownloadButton onClick={() => handleDownloadInvoice(invoice)}>PDF İndir</DownloadButton>
                {invoice.status === "pending" && (
                  <ReminderButton onClick={() => handleSendReminder(invoice.id)}>Hatırlatma Gönder</ReminderButton>
                )}
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default InvoiceManagement;
