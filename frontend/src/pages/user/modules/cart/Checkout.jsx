import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/features/cart/cartSlice";
import { addOrder } from "@/features/orders/ordersSlice"; // ✅ Sadece sipariş oluştur
import { useState } from "react";
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
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const { texts } = useLanguage(); // ✅ Dil desteği
  const { theme } = useTheme(); // ✅ Tema desteği

  const VAT_RATE = 0.19;
  const SHIPPING_COST = 20;
  const vatAmount = totalPrice * VAT_RATE;
  const grandTotal = totalPrice + SHIPPING_COST; // **KDV eklenmiyor, zaten dahil!**

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!paymentDetails.name || !paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv) {
      toast.error(`❌ ${texts.checkout.missingDetails || "Lütfen tüm ödeme bilgilerini doldurun!"}`);
      return;
    }

    try {
      // ✅ **Sipariş oluşturma**
      const newOrder = {
        id: `ORD-${Date.now()}`,
        userId: user.id,
        userName: user.name,
        userEmail: user.email, // ✅ Kullanıcı e-posta adresi
        userAddress: user.address, // ✅ Kullanıcı adresi
        date: new Date().toISOString(),
        items: cartItems.map((item) => ({
          productId: item.id,
          title: item.title,
          quantity: item.quantity,
          unitPrice: item.price,
          taxRate: 19,
        })),
        subtotal: totalPrice.toFixed(2),
        taxAmount: vatAmount.toFixed(2),
        totalAmount: grandTotal.toFixed(2),
        shippingCost: SHIPPING_COST,
        status: "pending", // ✅ Sipariş "pending" olarak başlar
        paymentStatus: "pending",
        orderDate: new Date().toISOString(),
      };

      await API.post("/orders", newOrder);
      dispatch(addOrder(newOrder));
      toast.success(`✅ ${texts.checkout.success || "Sipariş başarıyla oluşturuldu!"}`);
      dispatch(clearCart());
    } catch (error) {
      console.error("🚨 Sipariş oluşturulurken hata oluştu:", error);
      toast.error(`❌ ${texts.checkout.error || "Sipariş oluşturulamadı!"}`);
    }
  };

  return (
    <CheckoutContainer theme={theme}>
      <Title>{texts.checkout.title || "💳 Ödeme Sayfası"}</Title>

      <PaymentForm onSubmit={handleCheckout}>
        <CardDetails>
          <Label>{texts.checkout.cardHolder || "Kart Sahibi Adı"}</Label>
          <Input type="text" name="name" value={paymentDetails.name} onChange={handleChange} required />

          <Label>{texts.checkout.cardNumber || "Kart Numarası"}</Label>
          <Input type="text" name="cardNumber" value={paymentDetails.cardNumber} onChange={handleChange} required />

          <Label>{texts.checkout.expiryDate || "Son Kullanma Tarihi (MM/YY)"}</Label>
          <Input type="text" name="expiryDate" value={paymentDetails.expiryDate} onChange={handleChange} required />

          <Label>{texts.checkout.cvv || "CVV"}</Label>
          <Input type="password" name="cvv" value={paymentDetails.cvv} onChange={handleChange} required />
        </CardDetails>

        <Summary>
          <SummaryItem>{texts.checkout.totalPrice || "Toplam Fiyat"}: ${totalPrice.toFixed(2)}</SummaryItem>
          <SummaryItem>{texts.checkout.vat || "KDV (%19)"}: ${vatAmount.toFixed(2)}</SummaryItem>
          <SummaryItem>{texts.checkout.shippingCost || "Kargo Ücreti"}: ${SHIPPING_COST.toFixed(2)}</SummaryItem>
          <SummaryItem style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            {texts.checkout.grandTotal || "Genel Toplam"}: ${grandTotal.toFixed(2)}
          </SummaryItem>
        </Summary>

        <Button type="submit">{texts.checkout.completePayment || "💸 Ödemeyi Tamamla"}</Button>
      </PaymentForm>
    </CheckoutContainer>
  );
};

export default Checkout;
