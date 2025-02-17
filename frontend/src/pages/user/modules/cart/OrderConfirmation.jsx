import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import {
  ConfirmationContainer,
  Title,
  Message,
  OrderDetails,
  DetailItem,
  ButtonGroup,
  Button
} from "./styles/OrderConfirmationStyles";
// import { sendOrderConfirmationEmail } from "@/services/emailService"; // E-posta servisini yoruma aldık

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { texts } = useLanguage();
  const { theme } = useTheme();

  // 📌 Son oluşturulan siparişi Redux Store'dan al
  const lastOrder = useSelector((state) => state.orders.orders[0]);

  useEffect(() => {
    if (!lastOrder) {
      navigate("/"); // Eğer sipariş yoksa anasayfaya yönlendir
    }

    // 📌 E-posta gönderme işlemi (Şimdilik yoruma alındı, aktif etmek için açabilirsin)
    /*
    if (lastOrder) {
      sendOrderConfirmationEmail(lastOrder);
    }
    */
  }, [lastOrder, navigate]);

  if (!lastOrder) return null;

  return (
    <ConfirmationContainer theme={theme}>
      <Title theme={theme}>{texts.checkout.orderSuccessMessage}</Title>
      <Message theme={theme}>{texts.checkout.success}</Message>

      <OrderDetails theme={theme}>
        <DetailItem>
          {texts.checkout.orderId}: <strong>{lastOrder.id}</strong>
        </DetailItem>
        {/* ✅ Düzeltildi: orderDate direkt string olarak kullanılıyor */}
        <DetailItem>
          {texts.checkout.orderDate}: <strong>{lastOrder.orderDate}</strong>
        </DetailItem>
        <DetailItem>
          {texts.checkout.orderTotal}: <strong>${lastOrder.totalAmount}</strong>
        </DetailItem>
      </OrderDetails>

      <ButtonGroup>
        <Button theme={theme} onClick={() => navigate("/profile")}>
          {texts.checkout.viewOrders}
        </Button>
        <Button theme={theme} onClick={() => navigate("/")}>
          {texts.checkout.continueShopping}
        </Button>
      </ButtonGroup>
    </ConfirmationContainer>
  );
};

export default OrderConfirmation;
