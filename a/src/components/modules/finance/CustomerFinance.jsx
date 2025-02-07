import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { getCustomerFinancialData } from "../../api/customerFinanceApi";
import {
  Table,
  TableRow,
  TableHeader,
  TableData,
} from "../../styles/dashboardStyles";

const CustomerFinance = ({ customerId }) => {
  const { user } = useContext(AuthContext);
  const [financeData, setFinanceData] = useState([]);

  useEffect(() => {
    const fetchFinanceData = async () => {
      if (!user?.token) return;
      try {
        const data = await getCustomerFinancialData(customerId, user.token);
        setFinanceData(data);
      } catch (error) {
        console.error("Müşteri finans verileri alınamadı:", error);
      }
    };

    fetchFinanceData();
  }, [user, customerId]);

  return (
    <div>
      <h3>💰 Müşteri Finans Yönetimi</h3>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Ödeme Tarihi</TableHeader>
            <TableHeader>Tutar (€)</TableHeader>
            <TableHeader>Ödeme Yöntemi</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {financeData.map((entry) => (
            <TableRow key={entry.id}>
              <TableData>{entry.paymentDate}</TableData>
              <TableData>€{entry.amount}</TableData>
              <TableData>{entry.method}</TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomerFinance;
