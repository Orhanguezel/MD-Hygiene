import { OrdersContainer, OrdersTable, Th, Td, StatusBadge, ActionButton } from "./styles/ordersStyles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 

const Orders = () => {
  const navigate = useNavigate();
  const texts = useSelector((state) => state.language.texts);  // ✅ Dil verisini RTK'dan al
  const orders = useSelector((state) => state.orders) || [];   // ✅ Sipariş verisini RTK'dan al

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
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <Td>{order.id}</Td>
                <Td>{order.customer}</Td>
                <Td>
                  <StatusBadge status={order.status}>{texts.orders[order.status] || order.status}</StatusBadge>
                </Td>
                <Td>{order.totalAmount} ₺</Td>
                <Td>
                  <ActionButton onClick={() => navigate(`/orders/${order.id}`)}>
                    {texts.orders.viewDetails}
                  </ActionButton>
                </Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan="5">{texts.orders.noOrders || "Henüz sipariş yok."}</Td>
            </tr>
          )}
        </tbody>
      </OrdersTable>
    </OrdersContainer>
  );
};

export default Orders;
