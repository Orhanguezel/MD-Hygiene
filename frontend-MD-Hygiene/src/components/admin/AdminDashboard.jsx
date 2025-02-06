import { DashboardContainer, CardGrid, StatCard } from "../../styles/adminDashboardStyles";
import { useLanguage } from "../../context/LanguageContext";

const AdminDashboard = () => {
  const { texts } = useLanguage();

  return (
    <DashboardContainer>
      <h1>{texts.dashboard.title || "Yönetim Paneli"}</h1>
      <CardGrid>
        <StatCard>
          <h2>{texts.dashboard.users || "Kullanıcılar"}</h2>
          <p>150</p>
        </StatCard>
        <StatCard>
          <h2>{texts.dashboard.orders || "Siparişler"}</h2>
          <p>320</p>
        </StatCard>
        <StatCard>
          <h2>{texts.dashboard.invoices || "Faturalar"}</h2>
          <p>85</p>
        </StatCard>
        <StatCard>
          <h2>{texts.dashboard.notifications || "Bildirimler"}</h2>
          <p>12</p>
        </StatCard>
      </CardGrid>
    </DashboardContainer>
  );
};

export default AdminDashboard;
