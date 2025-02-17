import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderById, updateOrder } from "@/features/orders/ordersSlice";
import { 
  OrderDetailsContainer, 
  OrderInfo, 
  ProductList, 
  ProductItem, 
  StatusBadge, 
  BackButton,
  StatusButtonContainer,
  StatusButton,
} from "../styles/ordersStyles";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const texts = useSelector((state) => state.language.texts) || {};  
  const order = useSelector((state) => state.orders.selectedOrder); 
  const status = useSelector((state) => state.orders.status);

  // ✅ **Sipariş durumu için lokal state**
  const [orderStatus, setOrderStatus] = useState(order?.status || "pending");

  // ✅ **Siparişi API'den çek**
  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  // ✅ **Hata ve yükleme durumlarını yönet**
  useEffect(() => {
    if (order) {
      setOrderStatus(order.status); // Redux güncellendiğinde UI de güncellensin
    }
  }, [order]);

  if (status === "loading") return <p>{texts?.orders?.loading || "Sipariş yükleniyor..."}</p>;
  if (!order) return <p>{texts?.orders?.notFound || "Sipariş bulunamadı."}</p>;

  // ✅ **Siparişi Güncelleme Fonksiyonu**
  const handleUpdateOrder = (newStatus) => {
    const updatedOrder = { ...order, status: newStatus };

    if (newStatus === "shipped") updatedOrder.shippedDate = new Date().toISOString();
    else if (newStatus === "delivered") updatedOrder.deliveredDate = new Date().toISOString();

    dispatch(updateOrder(updatedOrder))
      .unwrap()
      .then(() => {
        setOrderStatus(newStatus); // **UI anlık güncelleniyor**
        toast.success(`✅ Sipariş durumu "${texts.orders[newStatus] || newStatus}" olarak güncellendi.`);
      })
      .catch(() => toast.error("❌ Sipariş durumu güncellenirken hata oluştu!"));
  };

  return (
    <OrderDetailsContainer>
      {/* ✅ Geri Dön Butonu */}
      <BackButton onClick={() => navigate(-1)}>
        ← {texts?.orders?.goBack || "Geri Dön"}
      </BackButton>

      <h1>{texts?.orders?.details || "Sipariş Detayları"}</h1>

      <OrderInfo>
        <p><strong>{texts?.orders?.orderNumber || "Sipariş No"}:</strong> {order.id}</p>
        <p><strong>{texts?.orders?.customer || "Müşteri"}:</strong> {order.userName}</p>
        <p><strong>{texts?.orders?.status || "Durum"}:</strong> 
          <StatusBadge $status={orderStatus}>
            {texts?.orders?.[orderStatus] || orderStatus}
          </StatusBadge>
        </p>
        <p><strong>{texts?.orders?.total || "Toplam"}:</strong> {Number(order.totalAmount || 0).toFixed(2)} ₺</p>
        <p><strong>{texts?.orders?.paymentStatus || "Ödeme Durumu"}:</strong> 
          {texts?.orders?.[order.paymentStatus] || order.paymentStatus}
        </p>
        {order.shippedDate && <p><strong>{texts?.orders?.shippedDate || "Kargoya Verildi"}:</strong> {new Date(order.shippedDate).toLocaleDateString()}</p>}
        {order.deliveredDate && <p><strong>{texts?.orders?.deliveredDate || "Teslim Edildi"}:</strong> {new Date(order.deliveredDate).toLocaleDateString()}</p>}
      </OrderInfo>

      {/* ✅ Sipariş Durumunu Güncelleme Butonları */}
      <StatusButtonContainer>
        {orderStatus === "pending" && (
          <StatusButton onClick={() => handleUpdateOrder("processing")} $processing>
            🔄 {texts?.orders?.markProcessing || "İşlemde"}
          </StatusButton>
        )}
        {orderStatus === "processing" && (
          <StatusButton onClick={() => handleUpdateOrder("shipped")} $shipped>
            🚚 {texts?.orders?.markShipped || "Kargoya Ver"}
          </StatusButton>
        )}
        {orderStatus === "shipped" && (
          <StatusButton onClick={() => handleUpdateOrder("delivered")} $delivered>
            📦 {texts?.orders?.markDelivered || "Teslim Edildi"}
          </StatusButton>
        )}
        {orderStatus === "delivered" && (
          <StatusButton onClick={() => handleUpdateOrder("archived")} $archived>
            🗂 {texts?.orders?.markArchived || "Arşive Kaldır"}
          </StatusButton>
        )}
      </StatusButtonContainer>

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
    </OrderDetailsContainer>
  );
};

export default OrderDetails;
