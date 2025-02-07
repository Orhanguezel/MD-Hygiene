import { useEffect, useState, useContext } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaFilter,
  FaFileInvoice,
  FaDownload,
  FaChartBar,
} from "react-icons/fa";
import AuthContext from "../../context/AuthContext";
import { getUserOrders, updateOrderStatus } from "../../api/orderApi";
import { generateInvoicePDF } from "../../utils/invoiceUtils";
import OrderReports from "../modules/reports/OrderReports";
import SalesReports from "../modules/reports/SalesReports";
import QRCodeGenerator from "../../utils/QRCodeGenerator";
import QRCodeScanner from "../../utils/QRCodeScanner";
import {
  Table,
  TableRow,
  TableHeader,
  TableData,
  UpdateButton,
  DetailsButton,
  FilterContainer,
  SearchInput,
  FilterButton,
  DateInput,
} from "../../styles/dashboardStyles";

const OrderManagement = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.token) {
        setError("⚠️ Giriş yapmalısınız.");
        setLoading(false);
        return;
      }
      try {
        const data = await getUserOrders(user.token);
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus, user.token);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Sipariş durumu güncellenemedi:", error);
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleDownloadInvoice = async (order) => {
    await generateInvoicePDF(order, {
      includeLogo: true,
      showTaxDetails: true,
      displayProductBreakdown: true,
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleDateFilter = (event) => {
    setDateFilter(event.target.value);
  };

  return (
    <div>
      <h3>📦 Sipariş Yönetimi</h3>
      <OrderReports detailed={true} />
      <SalesReports />
      {loading && <p>⏳ Siparişler yükleniyor...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <FilterContainer>
        <SearchInput
          type="text"
          placeholder="Müşteri Ara..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <DateInput type="date" value={dateFilter} onChange={handleDateFilter} />
        <FilterButton>
          <FaFilter /> Filtrele
        </FilterButton>
      </FilterContainer>

      <Table>
        <thead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Müşteri</TableHeader>
            <TableHeader>Tarih</TableHeader>
            <TableHeader>Tutar</TableHeader>
            <TableHeader>Durum</TableHeader>
            <TableHeader>İşlem</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {orders
            .filter((order) =>
              order.customerName.toLowerCase().includes(searchTerm)
            )
            .filter((order) => !dateFilter || order.date.startsWith(dateFilter))
            .map((order) => (
              <TableRow key={order.id}>
                <TableData>{order.id}</TableData>
                <TableData>{order.customerName}</TableData>
                <TableData>{order.date}</TableData>
                <TableData>€{order.total}</TableData>
                <TableData>{order.status}</TableData>
                <TableData>
                  <DetailsButton onClick={() => handleViewDetails(order)}>
                    <FaInfoCircle /> Detaylar
                  </DetailsButton>
                  {order.status !== "delivered" && (
                    <UpdateButton
                      onClick={() => handleStatusChange(order.id, "delivered")}
                    >
                      <FaCheckCircle /> Teslim Edildi
                    </UpdateButton>
                  )}
                  {order.status !== "cancelled" && (
                    <UpdateButton
                      onClick={() => handleStatusChange(order.id, "cancelled")}
                    >
                      <FaTimesCircle /> İptal Et
                    </UpdateButton>
                  )}
                  <UpdateButton onClick={() => handleDownloadInvoice(order)}>
                    <FaDownload /> Fatura İndir
                  </UpdateButton>
                </TableData>
              </TableRow>
            ))}
        </tbody>
      </Table>

      {selectedOrder && (
        <div>
          <h4>Sipariş Detayları</h4>
          <p>
            <strong>Müşteri:</strong> {selectedOrder.customerName}
          </p>
          <p>
            <strong>Tarih:</strong> {selectedOrder.date}
          </p>
          <p>
            <strong>Tutar:</strong> €{selectedOrder.total}
          </p>
          <p>
            <strong>Durum:</strong> {selectedOrder.status}
          </p>
          <QRCodeGenerator orderId={selectedOrder.id} />
          <QRCodeScanner orderId={selectedOrder.id} />
          <h5>Ürünler:</h5>
          <ul>
            {selectedOrder.products.map((product) => (
              <li key={product.id}>
                {product.name} - {product.quantity} Adet
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
