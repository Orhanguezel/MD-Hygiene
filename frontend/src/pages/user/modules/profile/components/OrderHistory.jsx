import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserOrders } from "@/features/orders/ordersSlice";
import { Section, OrderCard } from "../styles/profileStyles";

const OrderHistory = ({ userId }) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.userOrders);

  useEffect(() => {
    dispatch(fetchUserOrders(userId));
  }, [dispatch, userId]);

  return (
    <Section>
      <h2>🧾 Sipariş Geçmişi</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <OrderCard key={order.id}>
            <p><strong>Sipariş ID:</strong> {order.id}</p>
            <p><strong>Tarih:</strong> {new Date(order.date).toLocaleDateString()}</p>
            <p><strong>Tutar:</strong> ${order.totalAmount.toFixed(2)}</p>
            <p><strong>Durum:</strong> {order.status}</p>
          </OrderCard>
        ))
      ) : (
        <p>Henüz bir siparişiniz bulunmamaktadır.</p>
      )}
    </Section>
  );
};

export default OrderHistory;
