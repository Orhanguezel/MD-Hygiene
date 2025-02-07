import { useEffect, useState, useContext } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import AuthContext from "../../../context/AuthContext";
import { getSalesAnalytics } from "../../../api/analyticsApi";
import {
  FilterContainer,
  DateInput,
  FilterButton,
  AnalyticsContainer,
} from "../../../styles/dashboardStyles";

const SalesAnalytics = () => {
  const { user } = useContext(AuthContext);
  const [salesData, setSalesData] = useState([]);
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const fetchSalesData = async () => {
      if (!user?.token) return;
      try {
        const filters = { date: dateFilter };
        const data = await getSalesAnalytics(user.token, filters);
        setSalesData(data);
      } catch (error) {
        console.error("Satış analizleri alınamadı:", error);
      }
    };

    fetchSalesData();
  }, [user, dateFilter]);

  return (
    <AnalyticsContainer>
      <h3>📊 Satış Analitiği</h3>

      <FilterContainer>
        <DateInput type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
        <FilterButton>Filtrele</FilterButton>
      </FilterContainer>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ddd" />
          <Line type="monotone" dataKey="totalSales" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </AnalyticsContainer>
  );
};

export default SalesAnalytics;
