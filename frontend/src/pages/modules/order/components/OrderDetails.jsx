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

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id)).unwrap().catch((err) => {
        console.error("🚨 Sipariş detayı yüklenirken hata:", err);
      });
    }
  }, [dispatch, id]);

  if (status === "loading") return <p>{texts?.orders?.loading || "📦 Sipariş yükleniyor..."}</p>;
  if (!order?._id) return <p>{texts?.orders?.notFound || "🚫 Sipariş bulunamadı."}</p>;

  // ✅ **Siparişi Güncelleme**
  const handleUpdateOrder = async (newStatus) => {
    if (!order?._id) {
      toast.error("❌ Sipariş güncellenemedi! Sipariş ID eksik.");
      return;
    }

    try {
      await dispatch(updateOrder({ orderId: order._id, status: newStatus })).unwrap();
      toast.success(`✅ Sipariş durumu "${newStatus}" olarak güncellendi.`);
    } catch (err) {
      console.error("🚨 Sipariş güncelleme hatası:", err);
      toast.error("❌ Sipariş durumu güncellenirken hata oluştu!");
    }
  };

  return (
    <OrderDetailsContainer>
      <BackButton onClick={() => navigate(-1)}>← {texts?.orders?.goBack || "Geri Dön"}</BackButton>
      <h1>{texts?.orders?.details || "📝 Sipariş Detayları"}</h1>

      <OrderInfo>
        <p><strong>{texts?.orders?.orderNumber || "📌 Sipariş No"}:</strong> {order._id}</p>
        <p><strong>{texts?.orders?.customer || "👤 Müşteri"}:</strong> {order.user?.name || "Bilinmiyor"}</p>
        <p><strong>{texts?.orders?.status || "📦 Durum"}:</strong> 
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
        {order.products?.map((product, index) => (
          <ProductItem key={product.product?._id || index}>
            <p>{product.product?.title || product.name || "Ürün adı eksik!"}</p>
            <p>{texts?.orders?.quantity}: {product.quantity}</p>
            <p>{texts?.orders?.unitPrice}: {product.unitPrice} ₺</p>
          </ProductItem>
        ))}
      </ProductList>
    </OrderDetailsContainer>
  );
};

export default OrderDetails;
