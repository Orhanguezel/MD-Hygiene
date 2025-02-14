import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { fetchOrders } from "@/features/orders/ordersSlice"; // ✅ Siparişleri API'den çek
import {
  OrdersContainer,
  OrdersTable,
  Th,
  Td,
  StatusBadge,
  ActionButton,
} from "./styles/ordersStyles";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const texts = useSelector((state) => state.language.texts) || {};  // ✅ Dil desteği
  const orders = useSelector((state) => state.orders.orders) || [];  // ✅ Siparişleri çek
  const status = useSelector((state) => state.orders.status);        // ✅ Yüklenme durumu
  const error = useSelector((state) => state.orders.error);          // ✅ Hata kontrolü

  // ✅ Siparişleri API'den çek (sayfa açıldığında)
  useEffect(() => {
    dispatch(fetchOrders()).then((response) => {
      console.log("📌 API'den Gelen Siparişler:", response.payload);
    });
  }, [dispatch]);
  
  

  return (
    <OrdersContainer>
      <h1>{texts?.orders?.title || "Siparişler"}</h1>

      {status === "loading" ? (
        <p>{texts?.orders?.loading || "Siparişler yükleniyor..."}</p>
      ) : status === "failed" ? (
        <p>{texts?.orders?.error || "Siparişler yüklenemedi!"} - {error}</p>
      ) : (
        <OrdersTable>
          <thead>
            <tr>
              <Th>{texts?.orders?.orderNumber || "Sipariş No"}</Th>
              <Th>{texts?.orders?.customer || "Müşteri"}</Th>
              <Th>{texts?.orders?.status || "Durum"}</Th>
              <Th>{texts?.orders?.total || "Toplam"}</Th>
              <Th>{texts?.orders?.actions || "İşlemler"}</Th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <Td>{order.id}</Td>
                  <Td>{order.userName || texts?.orders?.unknownCustomer || "Bilinmiyor"}</Td>
                  <Td>
                    <StatusBadge status={order.status}>
                      {texts?.orders?.[order.status] || order.status}
                    </StatusBadge>
                  </Td>
                  <Td>{isNaN(order.totalAmount) ? "0.00" : Number(order.totalAmount).toFixed(2)} ₺</Td>

                  <Td>
                    <ActionButton onClick={() => navigate(`/orders/${order.id}`)}>
                      {texts?.orders?.viewDetails || "Detayları Gör"}
                    </ActionButton>
                  </Td>
                </tr>
              ))
            ) : (
              <tr>
                <Td colSpan="5">{texts?.orders?.noOrders || "Henüz sipariş yok."}</Td>
              </tr>
            )}
          </tbody>
        </OrdersTable>
      )}
    </OrdersContainer>
  );
};

export default Orders;
