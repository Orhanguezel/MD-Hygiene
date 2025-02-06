import { ReportsContainer, CardGrid, StatCard, StatTitle, StatValue, ChartContainer } from "../../styles/reportsStyles";
import { useLanguage } from "../../context/LanguageContext";

const Reports = () => {
  const { texts } = useLanguage();

  const dummyStats = {
    sales: "15,000 ₺",
    users: 320,
    orders: 210,
    revenue: "45,000 ₺",
  };

  return (
    <ReportsContainer>
      <h1>{texts.reports.title}</h1>
      <CardGrid>
        <StatCard>
          <StatTitle>{texts.reports.totalSales}</StatTitle>
          <StatValue>{dummyStats.sales}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>{texts.reports.totalUsers}</StatTitle>
          <StatValue>{dummyStats.users}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>{texts.reports.totalOrders}</StatTitle>
          <StatValue>{dummyStats.orders}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>{texts.reports.totalRevenue}</StatTitle>
          <StatValue>{dummyStats.revenue}</StatValue>
        </StatCard>
      </CardGrid>

      <ChartContainer>
        <h2>{texts.reports.salesChart}</h2>
        <p>Grafik burada olacak (placeholder)</p>
      </ChartContainer>
    </ReportsContainer>
  );
};

export default Reports;
