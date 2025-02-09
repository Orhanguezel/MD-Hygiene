import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchReports } from "@/features/reports/reportsSlice";
import {
  ReportsContainer,
  CardGrid,
  StatCard,
  StatTitle,
  StatValue,
  ChartContainer,
} from "./styles/reportsStyles";
import SalesChart from "./components/SalesChart";
import RevenueChart from "./components/RevenueChart";

const Reports = () => {
  const dispatch = useDispatch();
  const texts = useSelector((state) => state.settings?.texts);
  const reportsData = useSelector((state) => state.reports?.data) || []; // ✅ Güvenli erişim

  useEffect(() => {
    if (reportsData.length === 0) {
      dispatch(fetchReports());
    }
  }, [dispatch, reportsData.length]);

  // Toplamları hesaplama
  const totalSales = reportsData.reduce((acc, item) => acc + (item.sales || 0), 0);
  const totalOrders = reportsData.reduce((acc, item) => acc + (item.orders || 0), 0);
  const totalRevenue = reportsData.reduce((acc, item) => acc + (item.revenue || 0), 0);
  const totalUsers = reportsData.reduce((acc, item) => acc + (item.newUsers || 0), 0);

  return (
    <ReportsContainer>
      <h1>{texts?.reports?.title || "Raporlar"}</h1>

      <CardGrid>
        <StatCard>
          <StatTitle>{texts?.reports?.totalSales || "Toplam Satış"}</StatTitle>
          <StatValue>{totalSales.toLocaleString()} ₺</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>{texts?.reports?.totalUsers || "Toplam Kullanıcı"}</StatTitle>
          <StatValue>{totalUsers}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>{texts?.reports?.totalOrders || "Toplam Sipariş"}</StatTitle>
          <StatValue>{totalOrders}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>{texts?.reports?.totalRevenue || "Toplam Gelir"}</StatTitle>
          <StatValue>{totalRevenue.toLocaleString()} ₺</StatValue>
        </StatCard>
      </CardGrid>

      <ChartContainer>
        <h2>{texts?.reports?.salesChart || "Satış Grafiği"}</h2>
        <SalesChart data={reportsData} />
        <h2>{texts?.reports?.revenueChart || "Gelir Grafiği"}</h2>
        <RevenueChart data={reportsData} />
      </ChartContainer>
    </ReportsContainer>
  );
};

export default Reports;
