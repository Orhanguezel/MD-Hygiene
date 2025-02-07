import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { getFinancialReports } from "../../api/financeApi";
import {
  FilterContainer,
  DateInput,
  FilterButton,
  Table,
  TableRow,
  TableHeader,
  TableData,
} from "../../styles/dashboardStyles";

const IncomeExpenseReport = () => {
  const { user } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      if (!user?.token) return;
      try {
        const data = await getFinancialReports(user.token, { date: dateFilter });
        setReports(data);
      } catch (error) {
        console.error("Finans raporları alınamadı:", error);
      }
    };

    fetchReports();
  }, [user, dateFilter]);

  return (
    <div>
      <h3>📊 Gelir & Gider Raporları</h3>
      <FilterContainer>
        <DateInput type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
        <FilterButton>Filtrele</FilterButton>
      </FilterContainer>

      <Table>
        <thead>
          <TableRow>
            <TableHeader>Tarih</TableHeader>
            <TableHeader>Tip</TableHeader>
            <TableHeader>Miktar (€)</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableData>{report.date}</TableData>
              <TableData>{report.type}</TableData>
              <TableData>€{report.amount.toFixed(2)}</TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default IncomeExpenseReport;
