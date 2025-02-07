import { useEffect, useState, useContext } from "react";
import {
  FaUsers,
  FaShoppingCart,
  FaBox,
  FaEuroSign,
  FaTruck,
  FaChartBar,
  FaBell,
  FaMapMarkedAlt,
  FaHandshake,
} from "react-icons/fa";
import AuthContext from "../../context/AuthContext";
import { getAdminStats, getRecentOrders } from "../../api/adminApi";
import OrderTrackingMap from "../modules/orders/OrderTrackingMap";
import SalesAnalytics from "../modules/products/SalesAnalytics";
import OrderReports from "../modules/reports/OrderReports";
import Notifications from "./Notifications";
import OfferManagement from "./OfferManagement";
import {
  DashboardContainer,
  StatContainer,
  StatCard,
  Title,
  Section,
  Table,
  TableRow,
  TableHeader,
  TableData,
  IconWrapper,
  LoadingMessage,
  ErrorMessage,
} from "../../styles/dashboardStyles";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.token) {
        setError("⚠️ Giriş yapmalısınız.");
        setLoading(false);
        return;
      }
      try {
        const statsData = await getAdminStats(user.token);
        const ordersData = await getRecentOrders(user.token);
        setStats(statsData);
        setRecentOrders(ordersData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [user]);

  return (
    <DashboardContainer>
      <Title>📊 Admin-Dashboard</Title>

      {loading && <LoadingMessage>⏳ Veriler yükleniyor...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {/* 📌 Genel İstatistikler */}
      <StatContainer>
        <StatCard>
          <IconWrapper color="#2563eb">
            <FaUsers />
          </IconWrapper>
          <h3>Kullanıcılar</h3>
          <p>{stats.totalUsers || 0}</p>
        </StatCard>

        <StatCard>
          <IconWrapper color="#16a34a">
            <FaEuroSign />
          </IconWrapper>
          <h3>Toplam Satış</h3>
          <p>€{stats.totalSales || 0}</p>
        </StatCard>

        <StatCard>
          <IconWrapper color="#f59e0b">
            <FaShoppingCart />
          </IconWrapper>
          <h3>Siparişler</h3>
          <p>{stats.totalOrders || 0}</p>
        </StatCard>

        <StatCard>
          <IconWrapper color="#9333ea">
            <FaBox />
          </IconWrapper>
          <h3>Ürünler</h3>
          <p>{stats.totalProducts || 0}</p>
        </StatCard>

        <StatCard>
          <IconWrapper color="#0ea5e9">
            <FaTruck />
          </IconWrapper>
          <h3>Gönderimler</h3>
          <p>{stats.totalShipments || 0}</p>
        </StatCard>

        <StatCard>
          <IconWrapper color="#4b5563">
            <FaChartBar />
          </IconWrapper>
          <h3>Analizler</h3>
          <p>-</p>
        </StatCard>

        <StatCard>
          <IconWrapper color="#FF5733">
            <FaHandshake />
          </IconWrapper>
          <h3>Teklifler</h3>
          <p>{stats.totalOffers || 0}</p>
        </StatCard>
      </StatContainer>

      {/* 📌 Satış Analitikleri */}
      <Section>
        <h3>📈 Satış Analitikleri</h3>
        <SalesAnalytics />
      </Section>

      {/* 📌 Son Siparişler */}
      <Section>
        <h3>📦 Son Siparişler</h3>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>ID</TableHeader>
              <TableHeader>Müşteri</TableHeader>
              <TableHeader>Tarih</TableHeader>
              <TableHeader>Tutar</TableHeader>
              <TableHeader>Durum</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {recentOrders.length === 0 ? (
              <TableRow>
                <TableData colSpan="5">
                  Henüz sipariş bulunmamaktadır.
                </TableData>
              </TableRow>
            ) : (
              recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableData>{order.id}</TableData>
                  <TableData>{order.customerName}</TableData>
                  <TableData>{order.date}</TableData>
                  <TableData>€{order.total}</TableData>
                  <TableData>{order.status}</TableData>
                </TableRow>
              ))
            )}
          </tbody>
        </Table>
      </Section>

      {/* 📌 Teklif Yönetimi */}
      <Section>
        <h3>📜 Teklif Yönetimi</h3>
        <OfferManagement />
      </Section>

      {/* 📌 Sipariş Takibi (Harita) */}
      <Section>
        <h3>🗺️ Sipariş Takibi</h3>
        <OrderTrackingMap />
      </Section>

      {/* 📌 Bildirimler */}
      <Section>
        <h3>🔔 Bildirimler</h3>
        <Notifications />
      </Section>

      {/* 📌 Sipariş Raporları */}
      <Section>
        <h3>📜 Sipariş Raporları</h3>
        <OrderReports detailed={true} />
      </Section>
    </DashboardContainer>
  );
};

export default AdminDashboard;
