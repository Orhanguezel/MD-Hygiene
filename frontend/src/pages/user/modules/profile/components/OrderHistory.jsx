import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserOrders } from "@/features/orders/ordersSlice";
import { useLanguage } from "@/features/language/useLanguage"; 
import { useTheme } from "@/features/theme/useTheme"; 
import { Section, OrderCard } from "../styles/profileStyles"; // ✅ Stil dosyası

const OrderHistory = () => { // ✅ Artık default export olacak
  const dispatch = useDispatch();
  const { texts } = useLanguage();  
  const { theme } = useTheme();  
  const user = useSelector((state) => state.auth.user); 
  const orders = useSelector((state) => state.orders.userOrders) || []; 

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserOrders(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <Section theme={theme}>
      <h2>{texts.profile.orderHistory || "📦 Sipariş Geçmişi"}</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <OrderCard key={order.id} theme={theme}>
            <p><strong>{texts.profile.orderID || "📄 Sipariş No"}:</strong> {order.id}</p>
            <p><strong>{texts.profile.date || "📅 Tarih"}:</strong> {order.orderDate}</p>
            <p><strong>{texts.profile.amount || "💰 Tutar"}:</strong> {parseFloat(order.totalAmount).toFixed(2)} ₺</p>
            <p><strong>{texts.profile.status || "📌 Durum"}:</strong> {texts.orders[order.status] || order.status}</p>
          </OrderCard>
        ))
      ) : (
        <p>{texts.profile.noOrders || "❌ Henüz siparişiniz bulunmamaktadır."}</p>
      )}
    </Section>
  );
};

export default OrderHistory; // ✅ Default export olarak tanımlandı
