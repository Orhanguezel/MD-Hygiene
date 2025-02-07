import { useEffect, useState, useContext } from "react";
import { FaShoppingCart, FaBox, FaEuroSign, FaTruck, FaClipboardList, FaSearch } from "react-icons/fa";
import AuthContext from "../../context/AuthContext";
import { API } from "../../services/api";
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
  FilterContainer,
  SearchInput,
  FilterButton,
} from "../../styles/dashboardStyles";
import SalesChart from "../modules/products/SalesChart";
import OrdersTable from "../modules/OrdersTable";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    totalProducts: 0,
    totalShipments: 0,
    wishlistItems: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.token) {
        setError("⚠️ Giriş yapmalısınız.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API.USER_STATS}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("⚠️ Yetkisiz erişim");

        const data = await response.json();
        setStats(data);
        setFilteredOrders(data.orders || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredOrders(stats.orders.filter(order => 
      order.customerName.toLowerCase().includes(value) ||
      order.status.toLowerCase().includes(value)
    ));
  };

  return (
    <DashboardContainer>
      <Title>📊 Kullanıcı Paneli</Title>

      {loading && <LoadingMessage>⏳ Veriler yükleniyor...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <StatContainer>
        <StatCard><IconWrapper><FaShoppingCart /></IconWrapper><SectionTitle>Siparişlerim</SectionTitle><Value>{stats.totalOrders}</Value></StatCard>
        <StatCard><IconWrapper><FaEuroSign /></IconWrapper><SectionTitle>Harcanan Tutar</SectionTitle><Value>€{stats.totalSpent}</Value></StatCard>
        <StatCard><IconWrapper><FaBox /></IconWrapper><SectionTitle>Satın Alınan Ürünler</SectionTitle><Value>{stats.totalProducts}</Value></StatCard>
        <StatCard><IconWrapper><FaTruck /></IconWrapper><SectionTitle>Teslimatlarım</SectionTitle><Value>{stats.totalShipments}</Value></StatCard>
        <StatCard><IconWrapper><FaClipboardList /></IconWrapper><SectionTitle>İstek Listesi</SectionTitle><Value>{stats.wishlistItems}</Value></StatCard>
      </StatContainer>

      <FilterContainer>
        <SearchInput 
          type="text" 
          placeholder="Sipariş Ara..." 
          value={searchTerm} 
          onChange={handleSearch} 
        />
        <FilterButton><FaSearch /></FilterButton>
      </FilterContainer>

      <SalesChart />
      <OrdersTable orders={filteredOrders} />
    </DashboardContainer>
  );
};

export default UserDashboard;
