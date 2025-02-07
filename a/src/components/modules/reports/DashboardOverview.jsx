import { useEffect, useState, useContext } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
import AuthContext from "../../context/AuthContext";
import { getSalesData } from "../../api/salesApi";
import {
  DashboardContainer,
  ChartContainer,
} from "../../styles/dashboardStyles";

const DashboardOverview = () => {
  const { user } = useContext(AuthContext);
  const [salesData, setSalesData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      if (!user?.token) return;
      try {
        const data = await getSalesData(user.token);
        setSalesData(data.sales);
        setRevenueData(data.revenue);
      } catch (error) {
        console.error("Satış ve gelir verileri alınamadı:", error);
      }
    };

    fetchSalesData();
  }, [user]);

  return (
    <DashboardContainer>
      <h3>📊 Dashboard Analizleri</h3>

      <ChartContainer>
        <h4>📈 Aylık Satış Grafiği</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ddd" />
            <Line type="monotone" dataKey="totalSales" stroke="#2563eb" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ChartContainer>
        <h4>💰 Aylık Gelir ve Gider Analizi</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ddd" />
            <Bar dataKey="revenue" fill="#16a34a" />
            <Bar dataKey="expenses" fill="#ff4d4d" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </DashboardContainer>
  );
};

export default DashboardOverview;
