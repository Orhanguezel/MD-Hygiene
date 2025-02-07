import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { getFinancialReports } from "../../api/accountingApi";
import {
  FilterContainer,
  DateInput,
  FilterButton,
  Table,
  TableRow,
  TableHeader,
  TableData,
} from "../../styles/dashboardStyles";

const ExpenseAnalysis = () => {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!user?.token) return;
      try {
        const data = await getFinancialReports(user.token, { type: "expense", date: dateFilter });
        setExpenses(data);
      } catch (error) {
        console.error("Gider analizleri alınamadı:", error);
      }
    };

    fetchExpenses();
  }, [user, dateFilter]);

  return (
    <div>
      <h3>📉 Gider Analizi</h3>

      <FilterContainer>
        <DateInput type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
        <FilterButton>Filtrele</FilterButton>
      </FilterContainer>

      <Table>
        <thead>
          <TableRow>
            <TableHeader>Tarih</TableHeader>
            <TableHeader>Açıklama</TableHeader>
            <TableHeader>Miktar (€)</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableData>{expense.date}</TableData>
              <TableData>{expense.description}</TableData>
              <TableData>€{expense.amount.toFixed(2)}</TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ExpenseAnalysis;
