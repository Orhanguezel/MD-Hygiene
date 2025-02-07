import { ReportsContainer, CardGrid, StatCard, StatTitle, StatValue, ChartContainer } from "./styles/reportsStyles";
import { useLanguage } from "@/context/LanguageContext";
import reportsData from "./data/reportsData.json";
import SalesChart from "./components/SalesChart";
import RevenueChart from "./components/RevenueChart";

const Reports = () => {
  const { texts } = useLanguage();

  // Toplamları hesaplama
  const totalSales = reportsData.reduce((acc, item) => acc + item.sales, 0);
  const totalOrders = reportsData.reduce((acc, item) => acc + item.orders, 0);
  const totalRevenue = reportsData.reduce((acc, item) => acc + item.revenue, 0);
  const totalUsers = reportsData.reduce((acc, item) => acc + item.newUsers, 0);

  return (
    <ReportsContainer>
      <h1>{texts.reports.title}</h1>

      <CardGrid>
        <StatCard>
          <StatTitle>{texts.reports.totalSales}</StatTitle>
          <StatValue>{totalSales.toLocaleString()} ₺</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>{texts.reports.totalUsers}</StatTitle>
          <StatValue>{totalUsers}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>{texts.reports.totalOrders}</StatTitle>
          <StatValue>{totalOrders}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>{texts.reports.totalRevenue}</StatTitle>
          <StatValue>{totalRevenue.toLocaleString()} ₺</StatValue>
        </StatCard>
      </CardGrid>

      <ChartContainer>
        <h2>{texts.reports.salesChart}</h2>
        <SalesChart data={reportsData} />
        <h2>Gelir Grafiği</h2>
        <RevenueChart data={reportsData} />
      </ChartContainer>
    </ReportsContainer>
  );
};

export default Reports;
