import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { API } from "../../../services/api";
import styled from "styled-components";

const TableContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #2563eb;
  color: white;
  padding: 10px;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
`;

export default function OrdersTable() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.token) return;

      try {
        const response = await fetch(`${API.ADMIN_ORDERS}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (!response.ok) throw new Error("Siparişler alınamadı");

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <TableContainer>
      <h3>📦 Son Siparişler</h3>
      <Table>
        <thead>
          <tr>
            <Th>Sipariş No</Th>
            <Th>Müşteri</Th>
            <Th>Tarih</Th>
            <Th>Tutar</Th>
            <Th>Durum</Th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.customerName}</Td>
              <Td>{order.date}</Td>
              <Td>€{order.total}</Td>
              <Td>{order.status}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}
