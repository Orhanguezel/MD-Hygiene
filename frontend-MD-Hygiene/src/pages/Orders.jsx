import { useEffect, useState, useContext } from "react";
import { FaUser, FaDollarSign} from "react-icons/fa";
import AuthContext from "../AuthContext";
import { API } from "../services/api";
import {
  OrdersContainer,
  OrdersTable,
  TableHeader,
  TableRow,
  TableCell,
  SectionTitle,
  TitleContainer,
  StatusBadge,
  LoadingMessage,
  ErrorMessage,
} from "../styles/OrdersStyles";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.token) return;

      try {
        const response = await fetch(API.ORDERS, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (!response.ok) throw new Error("❌ Bestellungen konnten nicht geladen werden!");

        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error("❌ Unerwartete Datenstruktur:", data);
          setOrders([]);
        } else {
          setOrders(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <OrdersContainer>
      <TitleContainer>
        <SectionTitle>📦 Bestellungen</SectionTitle>
      </TitleContainer>

      {loading ? (
        <LoadingMessage>⏳ Daten werden geladen...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : orders.length === 0 ? (
        <ErrorMessage>🚀 Keine Bestellungen gefunden.</ErrorMessage>
      ) : (
        <OrdersTable>
          <thead>
            <tr>
              <TableHeader>ID</TableHeader>
              <TableHeader>
                <FaUser /> Benutzer
              </TableHeader>
              <TableHeader>
                <FaDollarSign /> Gesamtbetrag
              </TableHeader>
              <TableHeader>Status</TableHeader>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.user}</TableCell>
                <TableCell>€{order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <StatusBadge status={order.status}>{order.status}</StatusBadge>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </OrdersTable>
      )}
    </OrdersContainer>
  );
};

export default Orders;
