import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "@/features/cart/cartSlice";
import { addOrder } from "@/features/orders/ordersSlice";
import { toast } from "react-toastify";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import API from "@/services/api";
import {
  CheckoutContainer,
  Title,
  PaymentForm,
  Input,
  Button,
  Summary,
  SummaryItem,
  CardDetails,
  Label,
} from "./styles/CheckoutStyles";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { texts } = useLanguage();
  const { theme } = useTheme();

  // 📌 Kullanıcı ve Sepet Verileri
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  // 📌 Vergi ve Kargo Ücretleri
  const VAT_RATE = 0.19;
  const SHIPPING_COST = 20;
  const netPrice = totalPrice / (1 + VAT_RATE);
  const vatAmount = totalPrice - netPrice;
  const grandTotal = totalPrice + SHIPPING_COST;

  // 📌 Ödeme Bilgileri State
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });

  // 📌 Eğer sepet boşsa
  if (!cartItems || cartItems.length === 0) {
    return (
      <CheckoutContainer theme={theme}>
        <Title theme={theme}>{texts.checkout.title || "💳 Ödeme Sayfası"}</Title>
        <Label theme={theme}>
          {texts.checkout.emptyCart || "🚫 Sepetinizde geçerli ürün bulunmamaktadır."}
        </Label>
      </CheckoutContainer>
    );
  }

  // 📌 Ödeme Bilgisi Güncelleme
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  // 📌 Siparişi Tamamla Butonu
  const handleCheckout = async (e) => {
    e.preventDefault();

    if (
      !paymentDetails.name ||
      !paymentDetails.cardNumber ||
      !paymentDetails.expiryDate ||
      !paymentDetails.cvv
    ) {
      toast.error(
        texts.checkout.missingDetails || "❌ Lütfen tüm ödeme bilgilerini doldurun!"
      );
      return;
    }

    try {
      // ✅ Sipariş oluştur
      const newOrder = {
        id: `ORD-${Date.now()}`,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userAddress: user.address,
        date: new Date().toISOString(),
        items: cartItems.map((item) => ({
          productId: item.id,
          title: item.title,
          quantity: item.quantity,
          unitPrice: item.price,
          taxRate: VAT_RATE * 100,
        })),
        subtotal: totalPrice.toFixed(2),
        netAmount: netPrice.toFixed(2),
        taxAmount: vatAmount.toFixed(2),
        totalAmount: grandTotal.toFixed(2),
        shippingCost: SHIPPING_COST,
        status: "pending",
        paymentStatus: "pending",
        orderDate: new Date().toISOString(),
      };

      // ✅ API'ye sipariş gönder
      await API.post("/orders", newOrder);
      dispatch(addOrder(newOrder));

      // ✅ Sepeti temizle
      dispatch(clearCart());
      toast.success(texts.checkout.success || "✅ Sipariş başarıyla oluşturuldu!");
    } catch (error) {
      console.error("🚨 Sipariş oluşturulurken hata oluştu:", error);
      toast.error(texts.checkout.error || "❌ Sipariş oluşturulamadı!");
    }
  };

  return (
    <CheckoutContainer theme={theme}>
      <Title theme={theme}>{texts.checkout.title || "💳 Ödeme Sayfası"}</Title>

      <PaymentForm onSubmit={handleCheckout} theme={theme}>
        <CardDetails theme={theme}>
          <Label theme={theme}>{texts.checkout.cardHolder || "Kart Sahibi Adı"}</Label>
          <Input
            type="text"
            name="name"
            value={paymentDetails.name}
            onChange={handleChange}
            required
            theme={theme}
          />

          <Label theme={theme}>{texts.checkout.cardNumber || "Kart Numarası"}</Label>
          <Input
            type="text"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleChange}
            required
            theme={theme}
          />

          <Label theme={theme}>
            {texts.checkout.expiryDate || "Son Kullanma Tarihi (MM/YY)"}
          </Label>
          <Input
            type="text"
            name="expiryDate"
            value={paymentDetails.expiryDate}
            onChange={handleChange}
            required
            theme={theme}
          />

          <Label theme={theme}>{texts.checkout.cvv || "CVV"}</Label>
          <Input
            type="password"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handleChange}
            required
            theme={theme}
          />
        </CardDetails>

        <Summary theme={theme}>
          <SummaryItem theme={theme}>
            {texts.checkout.totalPrice || "Toplam Fiyat"}: ${totalPrice.toFixed(2)}
          </SummaryItem>
          <SummaryItem theme={theme}>
            {texts.checkout.netPrice || "Net Fiyat"}: ${netPrice.toFixed(2)}
          </SummaryItem>
          <SummaryItem theme={theme}>
            {texts.checkout.vat || "KDV (%19)"}: ${vatAmount.toFixed(2)}
          </SummaryItem>
          <SummaryItem theme={theme}>
            {texts.checkout.shippingCost || "Kargo Ücreti"}: ${SHIPPING_COST.toFixed(2)}
          </SummaryItem>
          <SummaryItem theme={theme}>
            {texts.checkout.grandTotal || "Genel Toplam"}: ${grandTotal.toFixed(2)}
          </SummaryItem>
        </Summary>

        <Button type="submit" theme={theme}>
          {texts.checkout.completePayment || "💸 Ödemeyi Tamamla"}
        </Button>
      </PaymentForm>
    </CheckoutContainer>
  );
};

export default Checkout;
