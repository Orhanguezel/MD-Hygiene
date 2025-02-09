import { useLanguage } from "@/features/language/useLanguage";  // ✅ RTK Dil Yönetimi
import { useTheme } from "@/features/theme/useTheme";            // ✅ RTK Tema Yönetimi
import { useNavigate } from "react-router-dom";
import {
  DashboardContainer,
  CardGrid,
  StatCard,
  CardTitle,
  CardCount
} from "@/styles/dashboardStyles";

const Dashboard = () => {
  const { texts } = useLanguage();  // ✅ Dil desteği
  const { theme } = useTheme();     // ✅ Tema desteği
  const navigate = useNavigate();

  const modules = [
    { title: texts?.dashboard?.users || "Kullanıcılar", count: 150, route: "/users" },
    { title: texts?.dashboard?.orders || "Siparişler", count: 320, route: "/orders" },
    { title: texts?.dashboard?.invoices || "Faturalar", count: 85, route: "/invoices" },
    { title: texts?.dashboard?.notifications || "Bildirimler", count: 12, route: "/notifications" },
    { title: texts?.sidebar?.reports || "Raporlar", count: 10, route: "/reports" },
    { title: texts?.sidebar?.auditLogs || "Denetim Kayıtları", count: 25, route: "/audit-logs" },
    { title: texts?.sidebar?.settings || "Ayarlar", count: 5, route: "/settings" },
    { title: texts?.sidebar?.stores || "Mağazalar", count: 8, route: "/stores" },
    { title: texts?.sidebar?.products || "Ürünler", count: 200, route: "/products" },
    { title: texts?.sidebar?.sales || "Satışlar", count: 45, route: "/sales" },
    { title: texts?.sidebar?.shipments || "Sevkiyatlar", count: 18, route: "/shipments" },
    { title: texts?.sidebar?.offers || "Teklifler", count: 7, route: "/offers" }
  ];

  return (
    <DashboardContainer style={{ backgroundColor: theme === "dark" ? "#1e1e1e" : "#f9f9f9" }}>
      <h1>{texts?.dashboard?.title || "Kontrol Paneli"}</h1>

      <CardGrid>
        {modules.map((module, index) => (
          <StatCard
            key={index}
            onClick={() => navigate(module.route)}
            style={{
              backgroundColor: theme === "dark" ? "#333" : "#fff",
              color: theme === "dark" ? "#f1f1f1" : "#333",
              border: theme === "dark" ? "1px solid #444" : "1px solid #ddd",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            <CardTitle>{module.title}</CardTitle>
            <CardCount>{module.count}</CardCount>
          </StatCard>
        ))}
      </CardGrid>
    </DashboardContainer>
  );
};

export default Dashboard;
