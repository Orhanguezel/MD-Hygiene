import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "@/features/cart/cartSlice";
import { addOrder } from "@/features/orders/ordersSlice";
import { toast } from "react-toastify";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
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

  // 📌 **Redux Store'dan Sepet ve Kullanıcı Verileri**
  const { cartItems, totalPrice, vatAmount, shippingCost, grandTotal } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  // 📌 **Ödeme Bilgileri State**
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });

  // 📌 **Eğer sepet boşsa kullanıcıyı bilgilendir**
  if (!cartItems.length) {
    return (
      <CheckoutContainer theme={theme}>
        <Title theme={theme}>{texts.checkout?.title || "💳 Ödeme Sayfası"}</Title>
        <Label theme={theme}>{texts.checkout?.emptyCart || "🚫 Sepetiniz boş."}</Label>
      </CheckoutContainer>
    );
  }

  // 📌 **Ödeme Bilgisi Güncelleme**
  const handleChange = (e) => {
    setPaymentDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 📌 **Siparişi Tamamla Butonu**
  const handleCheckout = async (e) => {
    e.preventDefault();

    console.log("📌 Ödeme Bilgileri:", paymentDetails);
    console.log("📌 Sepetteki Ürünler:", cartItems);

    if (Object.values(paymentDetails).some((value) => !value.trim())) {
      toast.error(texts.checkout?.missingDetails || "❌ Lütfen tüm ödeme bilgilerini doldurun!");
      return;
    }

    try {
      console.log("📌 Sipariş oluşturuluyor...");
      const order = await dispatch(addOrder(cartItems)).unwrap();
      console.log("✅ Sipariş Başarıyla Oluşturuldu:", order);

      // ✅ **Sipariş başarılı mesajı göster**
      toast.success(texts.checkout?.success || "✅ Sipariş oluşturuldu!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // ✅ **Sepeti temizle**
      dispatch(clearCart());

      // ✅ **Kullanıcıyı Sipariş Onay sayfasına yönlendir**
      navigate("/order-confirmation");
    } catch (error) {
      console.error("🚨 Sipariş Oluşturulamadı:", error);
      toast.error(texts.checkout?.error || "❌ Sipariş oluşturulamadı!");
    }
  };

  return (
    <CheckoutContainer theme={theme}>
      <Title theme={theme}>{texts.checkout?.title || "💳 Ödeme Sayfası"}</Title>

      <PaymentForm onSubmit={handleCheckout} theme={theme}>
        <CardDetails theme={theme}>
          <Label theme={theme}>{texts.checkout?.cardHolder || "💳 Kart Sahibi Adı"}</Label>
          <Input
            type="text"
            name="name"
            value={paymentDetails.name}
            onChange={handleChange}
            required
            theme={theme}
          />

          <Label theme={theme}>{texts.checkout?.cardNumber || "💳 Kart Numarası"}</Label>
          <Input
            type="text"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleChange}
            required
            theme={theme}
          />

          <Label theme={theme}>{texts.checkout?.expiryDate || "📅 Son Kullanma Tarihi (MM/YY)"}</Label>
          <Input
            type="text"
            name="expiryDate"
            value={paymentDetails.expiryDate}
            onChange={handleChange}
            required
            theme={theme}
          />

          <Label theme={theme}>{texts.checkout?.cvv || "🔐 CVV"}</Label>
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
            {texts.checkout?.totalPrice || "💰 Toplam Fiyat"}: ${totalPrice.toFixed(2)}
          </SummaryItem>
          <SummaryItem theme={theme}>
            {texts.checkout?.vat || "📊 Vergi (KDV 19%)"}: ${vatAmount.toFixed(2)}
          </SummaryItem>
          <SummaryItem theme={theme}>
            {texts.checkout?.shippingCost || "🚚 Kargo Ücreti"}: ${shippingCost.toFixed(2)}
          </SummaryItem>
          <SummaryItem theme={theme}>
            {texts.checkout?.grandTotal || "🧾 Genel Toplam"}: ${grandTotal.toFixed(2)}
          </SummaryItem>
        </Summary>

        <Button type="submit" theme={theme}>
          {texts.checkout?.completePayment || "💸 Ödemeyi Tamamla"}
        </Button>
      </PaymentForm>
    </CheckoutContainer>
  );
};

export default Checkout;
