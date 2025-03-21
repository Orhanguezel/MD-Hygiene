import { useEffect } from "react";
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
  const { selectedOrder: order, orderDetailsStatus, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (!id) {
      toast.error("❌ Sipariş ID eksik!");
      navigate(-1);
      return;
    }

    dispatch(fetchOrderById(id))
      .unwrap()
      .catch((err) => {
        console.error("🚨 Sipariş detayı yüklenirken hata:", err);
        toast.error("❌ Sipariş detayı yüklenemedi!");
      });
  }, [dispatch, id, navigate]);

  const handleUpdateOrder = async (newStatus) => {
    if (!order?._id) {
      toast.error("❌ Sipariş ID eksik!");
      return;
    }

    try {
      await dispatch(updateOrder({ orderId: order._id, status: newStatus })).unwrap();
      toast.success(`✅ Sipariş durumu "${texts?.orders?.[newStatus] || newStatus}" olarak güncellendi.`);
    } catch (err) {
      console.error("🚨 Sipariş güncelleme hatası:", err);
      toast.error("❌ Sipariş durumu güncellenirken hata oluştu!");
    }
  };

  if (orderDetailsStatus === "loading" || !order) {
    return <p>{texts?.orders?.loading || "📦 Sipariş yükleniyor..."}</p>;
  }

  if (orderDetailsStatus === "failed") {
    return <p>{texts?.orders?.error || "❌ Sipariş yüklenirken hata oluştu!"} - {error}</p>;
  }

  return (
    <OrderDetailsContainer>
      <BackButton onClick={() => navigate(-1)}>
        ← {texts?.orders?.goBack || "Geri Dön"}
      </BackButton>

      <h1>{texts?.orders?.details || "📝 Sipariş Detayları"}</h1>

      <OrderInfo>
        <p>
          <strong>{texts?.orders?.orderNumber || "📌 Sipariş No"}:</strong> {order._id}
        </p>
        <p>
          <strong>{texts?.orders?.customer || "👤 Müşteri"}:</strong>{" "}
          {order.user?.name || texts?.orders?.unknownCustomer || "Bilinmiyor"}
        </p>
        <p>
          <strong>{texts?.orders?.status || "📦 Durum"}:</strong>
          <StatusBadge $status={order.status}>
            {texts?.orders?.[order.status] || order.status}
          </StatusBadge>
        </p>
      </OrderInfo>

      <StatusButtonContainer>
        {["pending", "processing", "shipped", "delivered", "archived"].map((statusOption) => (
          <StatusButton key={statusOption} onClick={() => handleUpdateOrder(statusOption)}>
            {texts?.orders?.[statusOption] || statusOption}
          </StatusButton>
        ))}
      </StatusButtonContainer>

      <h2>{texts?.orders?.products || "📦 Ürünler"}</h2>
      <ProductList>
        {order.products?.length > 0 ? (
          order.products.map(({ product, name, quantity, unitPrice }, index) => (
            <ProductItem key={product?._id || index}>
              <p>{name || product?.title || texts?.orders?.unknownProduct || "Ürün adı eksik!"}</p>
              <p>{texts?.orders?.quantity || "Miktar"}: {quantity}</p>
              <p>{texts?.orders?.unitPrice || "Birim Fiyat"}: {unitPrice?.toFixed(2)} ₺</p>
            </ProductItem>
          ))
        ) : (
          <p>{texts?.orders?.noProducts || "🚫 Siparişte ürün bulunamadı!"}</p>
        )}
      </ProductList>
    </OrderDetailsContainer>
  );
};

export default OrderDetails;
