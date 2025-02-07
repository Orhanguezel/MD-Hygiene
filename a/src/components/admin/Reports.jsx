import { useState } from "react";
import { FaFilePdf, FaFileCsv, FaFileExcel, FaPrint, FaSearch } from "react-icons/fa";
import {
  ReportsContainer,
  SectionTitle,
  ReportsFilters,
  ReportsTable,
  ReportActionButton,
} from "../../styles/ReportsStyles";

const Reports = () => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [reports] = useState([
    { id: 1, type: "Rechnung", date: "2025-02-01", customer: "Kunde A", amount: "€150" },
    { id: 2, type: "Angebot", date: "2025-02-02", customer: "Kunde B", amount: "€200" },
    { id: 3, type: "Bericht", date: "2025-02-03", customer: "Kunde C", amount: "€300" },
  ]);

  const handleExport = (format) => {
    alert(`${format} Format wird heruntergeladen.`);
  };

  return (
    <ReportsContainer>
      <SectionTitle>📊 Raporübersicht</SectionTitle>

      {/* ✅ Filtreleme Alanı */}
      <ReportsFilters>
        <label>Von: <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} /></label>
        <label>Bis: <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} /></label>
        <button><FaSearch /> Filtern</button>
      </ReportsFilters>

      {/* ✅ Rapor Tablosu */}
      <ReportsTable>
        <thead>
          <tr>
            <th>#</th>
            <th>Typ</th>
            <th>Datum</th>
            <th>Kunde</th>
            <th>Betrag</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={report.id}>
              <td>{index + 1}</td>
              <td>{report.type}</td>
              <td>{report.date}</td>
              <td>{report.customer}</td>
              <td>{report.amount}</td>
              <td>
                <ReportActionButton onClick={() => handleExport("PDF")}><FaFilePdf /></ReportActionButton>
                <ReportActionButton onClick={() => handleExport("Excel")}><FaFileExcel /></ReportActionButton>
                <ReportActionButton onClick={() => handleExport("CSV")}><FaFileCsv /></ReportActionButton>
                <ReportActionButton onClick={() => handleExport("Print")}><FaPrint /></ReportActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </ReportsTable>
    </ReportsContainer>
  );
};

export default Reports;
