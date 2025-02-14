import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderById, updateOrder } from "@/features/orders/ordersSlice";
import { 
  OrderDetailsContainer, 
  OrderInfo, 
  ProductList, 
  ProductItem, 
  StatusBadge, 
  ActionButton 
} from "../styles/ordersStyles";
import { toast } from "react-toastify"; // ✅ Bildirim için Toastify

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const texts = useSelector((state) => state.language.texts) || {};  
  const order = useSelector((state) => state.orders.selectedOrder); 
  const status = useSelector((state) => state.orders.status);
  
  // ✅ Siparişi API'den çek
  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  // ✅ **Hata ve yükleme durumlarını yönet**
  if (status === "loading") return <p>{texts?.orders?.loading || "Sipariş yükleniyor..."}</p>;
  if (!order) return <p>{texts?.orders?.notFound || "Sipariş bulunamadı."}</p>;

  // ✅ **Siparişi Güncelleme Fonksiyonu**
  const handleUpdateOrder = (newStatus) => {
    const updatedOrder = { ...order, status: newStatus };
    
    if (newStatus === "shipped") updatedOrder.shippedDate = new Date().toISOString();
    else if (newStatus === "delivered") updatedOrder.deliveredDate = new Date().toISOString();

    dispatch(updateOrder(updatedOrder))
      .then(() => toast.success(`✅ Sipariş durumu "${texts.orders[newStatus] || newStatus}" olarak güncellendi.`))
      .catch(() => toast.error("❌ Sipariş durumu güncellenirken hata oluştu!"));
  };

  return (
    <OrderDetailsContainer>
      <h1>{texts?.orders?.details || "Sipariş Detayları"}</h1>

      <OrderInfo>
        <p><strong>{texts?.orders?.orderNumber || "Sipariş No"}:</strong> {order.id}</p>
        <p><strong>{texts?.orders?.customer || "Müşteri"}:</strong> {order.userName}</p>
        <p><strong>{texts?.orders?.status || "Durum"}:</strong> 
          <StatusBadge $status={order.status}>
            {texts?.orders?.[order.status] || order.status}
          </StatusBadge>
        </p>
        <p><strong>{texts?.orders?.total || "Toplam"}:</strong> {Number(order.totalAmount || 0).toFixed(2)} ₺</p>
        <p><strong>{texts?.orders?.paymentStatus || "Ödeme Durumu"}:</strong> 
          {texts?.orders?.[order.paymentStatus] || order.paymentStatus}
        </p>
        {order.shippedDate && <p><strong>{texts?.orders?.shippedDate || "Kargoya Verildi"}:</strong> {new Date(order.shippedDate).toLocaleDateString()}</p>}
        {order.deliveredDate && <p><strong>{texts?.orders?.deliveredDate || "Teslim Edildi"}:</strong> {new Date(order.deliveredDate).toLocaleDateString()}</p>}
      </OrderInfo>

      <h2>{texts?.orders?.products || "Ürünler"}</h2>
      <ProductList>
        {order.items && order.items.length > 0 ? (
          order.items.map((product, index) => (
            <ProductItem key={index}>
              <p>{product.title}</p>
              <p>{texts?.orders?.quantity || "Adet"}: {product.quantity}</p>
              <p>{texts?.orders?.unitPrice || "Birim Fiyat"}: {product.unitPrice.toFixed(2)} ₺</p> 
              <p>{texts?.orders?.total || "Toplam"}: {(product.unitPrice * product.quantity).toFixed(2)} ₺</p> 
            </ProductItem>
          ))
        ) : (
          <p>{texts?.orders?.noProducts || "Bu siparişte ürün bulunmamaktadır."}</p>
        )}
      </ProductList>

      <h2>{texts?.orders?.actions || "İşlemler"}</h2>
      {order.status === "pending" && (
        <>
          <ActionButton onClick={() => handleUpdateOrder("processing")}>
            ✅ {texts?.orders?.approve || "Siparişi Onayla"}
          </ActionButton>
          <ActionButton onClick={() => handleUpdateOrder("canceled")} danger>
            ❌ {texts?.orders?.reject || "Siparişi Reddet"}
          </ActionButton>
        </>
      )}

      {order.status === "processing" && (
        <ActionButton onClick={() => handleUpdateOrder("shipped")}>
          🚚 {texts?.orders?.ship || "Kargoya Ver"}
        </ActionButton>
      )}

      {order.status === "shipped" && (
        <ActionButton onClick={() => handleUpdateOrder("delivered")}>
          📦 {texts?.orders?.deliver || "Teslim Edildi"}
        </ActionButton>
      )}

      {order.status === "delivered" && (
        <ActionButton onClick={() => handleUpdateOrder("archived")}>
          🗂️ {texts?.orders?.archive || "Arşive Kaldır"}
        </ActionButton>
      )}
    </OrderDetailsContainer>
  );
};

export default OrderDetails;
