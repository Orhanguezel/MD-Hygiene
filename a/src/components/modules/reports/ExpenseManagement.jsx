import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { getExpenses, addExpense } from "../../api/expenseApi";
import {
  Table,
  TableRow,
  TableHeader,
  TableData,
  AddExpenseForm,
  SubmitButton,
} from "../../styles/dashboardStyles";

const ExpenseManagement = () => {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ name: "", amount: "", category: "rent" });

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!user?.token) return;
      try {
        const data = await getExpenses(user.token);
        setExpenses(data);
      } catch (error) {
        console.error("Giderler alınamadı:", error);
      }
    };

    fetchExpenses();
  }, [user]);

  const handleAddExpense = async () => {
    try {
      await addExpense(newExpense, user.token);
      setExpenses([...expenses, newExpense]);
      setNewExpense({ name: "", amount: "", category: "rent" });
    } catch (error) {
      console.error("Gider eklenemedi:", error);
    }
  };

  return (
    <div>
      <h3>📉 Gider Yönetimi</h3>
      <AddExpenseForm>
        <input type="text" placeholder="Gider Adı" value={newExpense.name} onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })} />
        <input type="number" placeholder="Tutar (€)" value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} />
        <select value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}>
          <option value="rent">Kira</option>
          <option value="salary">Maaş</option>
          <option value="utilities">Fatura (Elektrik, Su, İnternet)</option>
        </select>
        <SubmitButton onClick={handleAddExpense}>Ekle</SubmitButton>
      </AddExpenseForm>

      <Table>
        <thead>
          <TableRow>
            <TableHeader>Gider</TableHeader>
            <TableHeader>Tutar (€)</TableHeader>
            <TableHeader>Kategori</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableData>{expense.name}</TableData>
              <TableData>€{expense.amount}</TableData>
              <TableData>{expense.category}</TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ExpenseManagement;
