// ✅ OrderDetails.jsx
import { useParams } from "react-router-dom";
import { useOrders } from "@/context/OrdersContext";
import { OrderDetailsContainer, OrderInfo, ProductList, ProductItem, StatusBadge } from "../styles/ordersStyles";
import { useLanguage } from "@/context/LanguageContext";

const OrderDetails = () => {
  const { id } = useParams();
  const { orders } = useOrders();
  const { texts } = useLanguage();
  
  const order = orders.find((o) => o.id === id);

  if (!order) return <p>{texts.orders.notFound}</p>;

  return (
    <OrderDetailsContainer>
      <h1>{texts.orders.details}</h1>
      <OrderInfo>
        <p><strong>{texts.orders.orderNumber}:</strong> {order.id}</p>
        <p><strong>{texts.orders.customer}:</strong> {order.customer}</p>
        <p><strong>{texts.orders.status}:</strong> <StatusBadge status={order.status}>{order.status}</StatusBadge></p>
        <p><strong>{texts.orders.total}:</strong> {order.totalAmount} ₺</p>
        <p><strong>{texts.orders.paymentStatus}:</strong> {order.paymentStatus}</p>
        <p><strong>{texts.orders.shippingAddress}:</strong> {`${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.country}`}</p>
      </OrderInfo>

      <h2>{texts.orders.products}</h2>
      <ProductList>
        {order.products.map((product, index) => (
          <ProductItem key={index}>
            <p>{product.product}</p>
            <p>{texts.orders.quantity}: {product.quantity}</p>
            <p>{texts.orders.unitPrice}: {product.unitPrice} ₺</p>
          </ProductItem>
        ))}
      </ProductList>
    </OrderDetailsContainer>
  );
};

export default OrderDetails;
