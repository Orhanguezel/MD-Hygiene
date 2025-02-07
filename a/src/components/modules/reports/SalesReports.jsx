import { useEffect, useState, useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import AuthContext from "../../../context/AuthContext";
import { getSalesData } from "../../../api/salesApi";
import {
  FilterContainer,
  SearchInput,
  FilterButton,
  DateInput,
} from "../../../styles/dashboardStyles";

const SalesReports = () => {
  const { user } = useContext(AuthContext);
  const [salesData, setSalesData] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    const fetchSalesData = async () => {
      if (!user?.token) return;
      try {
        const filters = {
          date: dateFilter,
          category: categoryFilter,
        };
        const data = await getSalesData(user.token, filters);
        setSalesData(data);
      } catch (error) {
        console.error("Satış verileri alınamadı:", error);
      }
    };

    fetchSalesData();
  }, [user, dateFilter, categoryFilter]);

  return (
    <div>
      <h3>📊 Satış Raporları</h3>

      {/* 📌 Filtreleme Seçenekleri */}
      <FilterContainer>
        <DateInput type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
        <SearchInput type="text" placeholder="Kategori Ara..." value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} />
        <FilterButton>Filtrele</FilterButton>
      </FilterContainer>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={salesData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ddd" />
          <Bar dataKey="totalSales" fill="#16a34a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesReports;

