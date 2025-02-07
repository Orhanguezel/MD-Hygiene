// ✅ Orders.jsx
import { OrdersContainer, OrdersTable, Th, Td, StatusBadge, ActionButton } from "./styles/ordersStyles";
import { useLanguage } from "@/context/LanguageContext";
import { useOrders } from "@/context/OrdersContext";
import { useNavigate } from "react-router-dom"; // ✅ Navigate ekleniyor

const Orders = () => {
  const { texts } = useLanguage();
  const { orders } = useOrders();
  const navigate = useNavigate(); // ✅ Navigate hook'u tanımlandı

  return (
    <OrdersContainer>
      <h1>{texts.orders.title}</h1>
      <OrdersTable>
        <thead>
          <tr>
            <Th>{texts.orders.orderNumber}</Th>
            <Th>{texts.orders.customer}</Th>
            <Th>{texts.orders.status}</Th>
            <Th>{texts.orders.total}</Th>
            <Th>{texts.orders.actions}</Th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.customer}</Td>
              <Td>
                <StatusBadge status={order.status}>{order.status}</StatusBadge>
              </Td>
              <Td>{order.totalAmount} ₺</Td>
              <Td>
                <ActionButton onClick={() => navigate(`/orders/${order.id}`)}> {/* ✅ Detaylara yönlendirme */}
                  {texts.orders.viewDetails}
                </ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </OrdersTable>
    </OrdersContainer>
  );
};

export default Orders;
