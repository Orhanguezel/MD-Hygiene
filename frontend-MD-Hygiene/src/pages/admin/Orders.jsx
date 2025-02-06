import { OrdersContainer, OrdersTable, Th, Td, StatusBadge, ActionButton } from "../../styles/ordersStyles";
import { useLanguage } from "../../context/LanguageContext";

const Orders = () => {
  const { texts } = useLanguage();

  const dummyOrders = [
    { id: "001", customer: "Ali Veli", status: "Tamamlandı", total: "250 ₺" },
    { id: "002", customer: "Ayşe Yılmaz", status: "Beklemede", total: "150 ₺" },
    { id: "003", customer: "Mehmet Demir", status: "İptal Edildi", total: "0 ₺" },
  ];

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
          {dummyOrders.map((order) => (
            <tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.customer}</Td>
              <Td>
                <StatusBadge status={order.status}>{order.status}</StatusBadge>
              </Td>
              <Td>{order.total}</Td>
              <Td>
                <ActionButton>{texts.orders.viewDetails}</ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </OrdersTable>
    </OrdersContainer>
  );
};

export default Orders;
