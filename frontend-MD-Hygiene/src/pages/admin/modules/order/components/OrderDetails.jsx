import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  OrderDetailsContainer, 
  OrderInfo, 
  ProductList, 
  ProductItem, 
  StatusBadge 
} from "../styles/ordersStyles";

const OrderDetails = () => {
  const { id } = useParams();
  const texts = useSelector((state) => state.language.texts);    // ✅ Dil verisini RTK'dan al
  const orders = useSelector((state) => state.orders) || [];     // ✅ Sipariş verisini RTK'dan al

  const order = orders.find((o) => o.id === id);                // ✅ Siparişi bul

  if (!order) return <p>{texts.orders.notFound || "Sipariş bulunamadı."}</p>;

  return (
    <OrderDetailsContainer>
      <h1>{texts.orders.details || "Sipariş Detayları"}</h1>
      <OrderInfo>
        <p><strong>{texts.orders.orderNumber || "Sipariş Numarası"}:</strong> {order.id}</p>
        <p><strong>{texts.orders.customer || "Müşteri"}:</strong> {order.customer}</p>
        <p><strong>{texts.orders.status || "Durum"}:</strong> 
          <StatusBadge status={order.status}>
            {texts.orders[order.status] || order.status}
          </StatusBadge>
        </p>
        <p><strong>{texts.orders.total || "Toplam"}:</strong> {order.totalAmount} ₺</p>
        <p><strong>{texts.orders.paymentStatus || "Ödeme Durumu"}:</strong> 
          {texts.orders[order.paymentStatus] || order.paymentStatus}
        </p>
        <p><strong>{texts.orders.shippingAddress || "Teslimat Adresi"}:</strong> 
          {order.shippingAddress
            ? `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.country}`
            : texts.orders.noAddress || "Adres bilgisi bulunamadı."}
        </p>
      </OrderInfo>

      <h2>{texts.orders.products || "Ürünler"}</h2>
      <ProductList>
        {order.products && order.products.length > 0 ? (
          order.products.map((product, index) => (
            <ProductItem key={index}>
              <p>{product.product}</p>
              <p>{texts.orders.quantity || "Adet"}: {product.quantity}</p>
              <p>{texts.orders.unitPrice || "Birim Fiyat"}: {product.unitPrice} ₺</p>
            </ProductItem>
          ))
        ) : (
          <p>{texts.orders.noProducts || "Bu siparişte ürün bulunmamaktadır."}</p>
        )}
      </ProductList>
    </OrderDetailsContainer>
  );
};

export default OrderDetails;
