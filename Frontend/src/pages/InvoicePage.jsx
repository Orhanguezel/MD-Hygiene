import { useState, useEffect } from "react";
import { API } from "../services/api"; 
import { FaFileInvoice, FaFilePdf, FaFileCsv, FaFileExcel, FaPrint } from "react-icons/fa";
import {
  InvoiceContainer,
  InvoiceList,
  InvoiceItem,
  InvoiceFilters,
  InvoiceActionButton,
  LoadingMessage,
  ErrorMessage
} from "../styles/InvoiceStyles";

const InvoicePage = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API.INVOICES);
        if (!response.ok) throw new Error("❌ Rechnungen konnten nicht geladen werden!");

        const data = await response.json();
        setInvoices(Array.isArray(data) ? data : []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handleExport = (format) => {
    alert(`${format} formatında rapor indirilecek.`);
  };

  return (
    <InvoiceContainer>
      <h2>📜 Rechnungen</h2>

      {/* ✅ Filtreleme Alanı */}
      <InvoiceFilters>
        <label>Von: <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} /></label>
        <label>Bis: <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} /></label>
        <button>Filtern</button>
      </InvoiceFilters>

      {loading && <LoadingMessage>Lädt Rechnungen...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {!loading && !error && (
        <InvoiceList>
          {invoices.length > 0 ? (
            invoices.map((invoice) => (
              <InvoiceItem key={invoice._id}>
                <FaFileInvoice />
                <span>{invoice.invoiceNumber} - {invoice.totalAmount} €</span>
                <InvoiceActionButton onClick={() => handleExport("PDF")}><FaFilePdf /></InvoiceActionButton>
                <InvoiceActionButton onClick={() => handleExport("Excel")}><FaFileExcel /></InvoiceActionButton>
                <InvoiceActionButton onClick={() => handleExport("CSV")}><FaFileCsv /></InvoiceActionButton>
                <InvoiceActionButton onClick={() => handleExport("Print")}><FaPrint /></InvoiceActionButton>
              </InvoiceItem>
            ))
          ) : (
            <p>⚠️ Keine Rechnungen vorhanden.</p>
          )}
        </InvoiceList>
      )}
    </InvoiceContainer>
  );
};

export default InvoicePage;
