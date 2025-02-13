import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserOrders } from "@/features/orders/ordersSlice";
import { useLanguage } from "@/features/language/useLanguage"; // ✅ Dil Desteği
import { useTheme } from "@/features/theme/useTheme"; // ✅ Tema Desteği
import { Section, OrderCard } from "../styles/profileStyles";

const OrderHistory = ({ userId }) => {
  const dispatch = useDispatch();
  const { texts } = useLanguage();  // ✅ Dil desteği
  const { theme } = useTheme();  // ✅ Tema desteği
  const orders = useSelector((state) => state.orders.userOrders) || []; // ✅ Varsayılan olarak boş dizi

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserOrders(userId));
    }
  }, [dispatch, userId]);

  return (
    <Section theme={theme}>
      <h2>{texts.profile.orderHistory}</h2>
      {orders.length > 0 ? (
        orders.map((order) => {
          const formattedTotalAmount = order.totalAmount
            ? parseFloat(order.totalAmount).toFixed(2)
            : "0.00"; // ✅ Güvenli dönüşüm

          return (
            <OrderCard key={order.id} theme={theme}>
              <p><strong>{texts.profile.orderID}:</strong> {order.id}</p>
              <p><strong>{texts.profile.date}:</strong> {new Date(order.date).toLocaleDateString()}</p>
              <p><strong>{texts.profile.amount}:</strong> ${formattedTotalAmount}</p>
              <p><strong>{texts.profile.status}:</strong> {order.status}</p>
            </OrderCard>
          );
        })
      ) : (
        <p>{texts.profile.noOrders}</p>
      )}
    </Section>
  );
};

export default OrderHistory;
