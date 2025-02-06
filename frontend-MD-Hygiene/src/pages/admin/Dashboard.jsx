import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import {
  DashboardContainer,
  CardGrid,
  StatCard,
  CardTitle,
  CardCount
} from "../../styles/dashboardStyles";

const Dashboard = () => {
  const { texts } = useLanguage();
  const navigate = useNavigate();

  const modules = [
    { title: texts.dashboard.users, count: 150, route: "/users" },
    { title: texts.dashboard.orders, count: 320, route: "/orders" },
    { title: texts.dashboard.invoices, count: 85, route: "/invoices" },
    { title: texts.dashboard.notifications, count: 12, route: "/notifications" },
    { title: texts.sidebar.reports, count: 10, route: "/reports" },
    { title: texts.sidebar.auditLogs, count: 25, route: "/audit-logs" },
    { title: texts.sidebar.settings, count: 5, route: "/settings" },
    { title: texts.sidebar.stores, count: 8, route: "/stores" },
    { title: texts.sidebar.products, count: 200, route: "/products" },
    { title: texts.sidebar.sales, count: 45, route: "/sales" },
    { title: texts.sidebar.shipments, count: 18, route: "/shipments" },
    { title: texts.sidebar.offers, count: 7, route: "/offers" }
  ];

  return (
    <DashboardContainer>
      <h1>{texts.dashboard.title}</h1>
      <CardGrid>
        {modules.map((module, index) => (
          <StatCard key={index} onClick={() => navigate(module.route)}>
            <CardTitle>{module.title}</CardTitle>
            <CardCount>{module.count}</CardCount>
          </StatCard>
        ))}
      </CardGrid>
    </DashboardContainer>
  );
};

export default Dashboard;
