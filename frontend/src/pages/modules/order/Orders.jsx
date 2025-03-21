import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrders, deleteOrder } from "@/features/orders/ordersSlice";
import {
  OrdersContainer,
  OrdersTable,
  Th,
  Td,
  StatusBadge,
  ActionButton,
  DeleteButton,
} from "./styles/ordersStyles";
import { toast } from "react-toastify";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const texts = useSelector((state) => state.language.texts) || {};
  const { orders, ordersStatus: status, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders())
      .unwrap()
      .catch((err) => {
        console.error("🚨 Siparişler yüklenemedi:", err);
        toast.error("❌ Siparişler yüklenemedi!");
      });
  }, [dispatch]);

  const handleDeleteOrder = async (orderId) => {
    const confirmMessage = texts?.orders?.confirmDelete || "Bu siparişi silmek istediğinizden emin misiniz?";
    if (!window.confirm(confirmMessage)) return;

    try {
      await dispatch(deleteOrder(orderId)).unwrap();
      toast.success(texts?.orders?.orderDeleted || "✅ Sipariş başarıyla silindi!");
    } catch (err) {
      console.error("🚨 Sipariş silme hatası:", err);
      toast.error(texts?.orders?.orderDeleteError || "❌ Sipariş silinemedi!");
    }
  };

  if (status === "loading") {
    return <p>{texts?.orders?.loading || "📦 Siparişler yükleniyor..."}</p>;
  }

  if (status === "failed") {
    return (
      <p>
        {texts?.orders?.error || "❌ Siparişler yüklenirken hata oluştu!"} - {error}
      </p>
    );
  }

  return (
    <OrdersContainer>
      <h1>{texts?.orders?.title || "📦 Siparişler"}</h1>

      {orders && orders.length > 0 ? (
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
            {orders.map(({ _id, user, status, totalAmount }) => (
              <tr key={_id}>
                <Td>{_id}</Td>
                <Td>{user?.name || texts?.orders?.unknownCustomer || "Bilinmiyor"}</Td>
                <Td>
                  <StatusBadge $status={status}>
                    {texts?.orders?.[status] || status}
                  </StatusBadge>
                </Td>
                <Td>{Number(totalAmount || 0).toFixed(2)} ₺</Td>
                <Td>
                  <ActionButton onClick={() => navigate(`/orders/${_id}`)}>
                    {texts?.orders?.viewDetails || "Detayları Gör"}
                  </ActionButton>
                  <DeleteButton onClick={() => handleDeleteOrder(_id)}>
                    {texts?.orders?.deleteOrder || "❌ Sil"}
                  </DeleteButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </OrdersTable>
      ) : (
        <p>{texts?.orders?.noOrders || "🚫 Henüz sipariş yok."}</p>
      )}
    </OrdersContainer>
  );
};

export default Orders;
