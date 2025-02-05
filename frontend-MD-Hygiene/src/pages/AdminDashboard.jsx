import { useEffect, useState, useContext } from "react";
import { FaUsers, FaShoppingCart, FaBox, FaEuroSign, FaEnvelope, FaTruck, FaFileAlt } from "react-icons/fa"; // 📌 Yeni ikon eklendi
import AuthContext from "../AuthContext";
import { API } from "../services/api";
import {
  DashboardContainer,
  Title,
  StatContainer,
  StatCard,
  SectionTitle,
  Value,
  IconWrapper,
  LoadingMessage,
  ErrorMessage,
} from "../styles/AdminDashboardStyles";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalMails: 0,
    totalShipments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.token) {
        setError("⚠️ Nicht angemeldet! (Giriş yapmalısınız.)");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API.ADMIN_STATS}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("⚠️ Zugriff verweigert! (Yetkisiz erişim)");

        const data = await response.json();
        setStats(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  const statData = [
    { title: "Benutzer", value: stats.totalUsers, icon: <FaUsers />, color: "#2563eb" },
    { title: "Gesamtumsatz", value: `€${stats.totalSales}`, icon: <FaEuroSign />, color: "#16a34a" },
    { title: "Bestellungen", value: stats.totalOrders, icon: <FaShoppingCart />, color: "#f59e0b" },
    { title: "Produkte", value: stats.totalProducts, icon: <FaBox />, color: "#9333ea" },
    { title: "Mails", value: stats.totalMails, icon: <FaEnvelope />, color: "#dc2626" },
    { title: "Lieferungen", value: stats.totalShipments, icon: <FaTruck />, color: "#0ea5e9" },
    { title: "Berichte", value: "-", icon: <FaFileAlt />, color: "#4b5563" }, // 📌 Raporlar eklendi
  ];

  return (
    <DashboardContainer>
      <Title>📊 Admin-Dashboard</Title>

      {/* 📌 Yükleme Mesajı */}
      {loading && <LoadingMessage>⏳ Daten werden geladen...</LoadingMessage>}

      {/* 📌 Hata Mesajı */}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {/* 📌 İstatistik Kartları */}
      <StatContainer>
        {statData.map((stat, index) => (
          <StatCard key={index} style={{ borderBottom: `4px solid ${stat.color}` }}>
            <IconWrapper style={{ backgroundColor: stat.color }}>{stat.icon}</IconWrapper>
            <SectionTitle>{stat.title}</SectionTitle>
            <Value>{stat.value}</Value>
          </StatCard>
        ))}
      </StatContainer>
    </DashboardContainer>
  );
};

export default AdminDashboard;
