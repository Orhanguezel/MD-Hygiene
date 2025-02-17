import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserOrders } from "@/features/orders/ordersSlice";
import { useLanguage } from "@/features/language/useLanguage"; 
import { useTheme } from "@/features/theme/useTheme"; 
import { Section, OrderCard, StatusBadge } from "../styles/profileStyles"; 

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { texts } = useLanguage();  
  const { theme } = useTheme();  
  const user = useSelector((state) => state.auth.user); 
  const orders = useSelector((state) => state.orders.userOrders) || []; 
  const orderStatus = useSelector((state) => state.orders.status);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserOrders(user.id)).then((response) => {
        console.log("📦 Kullanıcı Siparişleri:", response.payload);
        console.log("👤 Kullanıcı ID:", user?.id);
      });
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    console.log("📦 Redux Store'daki `orders.userOrders`:", orders);
  }, [orders]);

  return (
    <Section theme={theme}>
      <h2>{texts.profile.orderHistory || "📦 Sipariş Geçmişi"}</h2>

      {orderStatus === "loading" ? (
        <p>🔄 {texts.profile.loadingOrders || "Siparişler yükleniyor..."}</p>
      ) : orders.length > 0 ? (
        orders.map((order) => (
          <OrderCard key={order.id} theme={theme}>
            <p><strong>{texts.profile.orderID || "📄 Sipariş No"}:</strong> {order.id}</p>
            <p><strong>{texts.profile.date || "📅 Tarih"}:</strong> {order.orderDate}</p>
            <p><strong>{texts.profile.amount || "💰 Tutar"}:</strong> {parseFloat(order.totalAmount).toFixed(2)} ₺</p>
            <p>
              <strong>{texts.profile.status || "📌 Durum"}:</strong>
              <StatusBadge $status={order.status}>
                {texts.orders[order.status] || order.status}
              </StatusBadge>
            </p>
          </OrderCard>
        ))
      ) : (
        <p>⚠️ {texts.profile.noOrders || "Henüz siparişiniz bulunmamaktadır."}</p>
      )}
    </Section>
  );
};

export default OrderHistory;
