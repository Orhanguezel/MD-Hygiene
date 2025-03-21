import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "@/features/cart/cartSlice";
import { addOrder } from "@/features/orders/ordersSlice";
import { fetchCompanyInfo } from "@/features/company/companySlice";
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

  // Redux Store'dan verileri al
  const { cartItems, totalPrice, vatAmount, shippingCost, grandTotal } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const company = useSelector((state) => state.company.company);
  const companyStatus = useSelector((state) => state.company.status);

  // ✅ Şirket bilgisini yükle
  useEffect(() => {
    if (!company && companyStatus === "idle") {
      dispatch(fetchCompanyInfo());
    }
  }, [company, companyStatus, dispatch]);

  // 📌 Ödeme bilgileri state yönetimi
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });

  // 📌 Ödeme Bilgisi Güncelleme
  const handleChange = (e) => {
    setPaymentDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 📌 Ödeme bilgisi doğrulama
  const isPaymentValid = () => Object.values(paymentDetails).every((value) => value.trim() !== "");

  // 📌 Siparişi Tamamla
  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!isPaymentValid()) {
      toast.error(texts.checkout?.missingDetails || "❌ Lütfen tüm ödeme bilgilerini doldurun!");
      return;
    }

    if (!company || !company._id) {
      toast.error(texts.checkout?.missingCompany || "❌ Şirket bilgisi eksik! Sipariş verilemez.");
      return;
    }

    const orderData = {
      user: user._id,
      company: company._id,
      products: cartItems.map((item) => ({
        productId: item.product._id,
        name: item.product.title,
        quantity: item.quantity,
        unitPrice: item.price,
      })),
      totalAmount: grandTotal,
      taxAmount: vatAmount,
      shippingCost,
      shippingAddress: user.address || { street: "", city: "", postalCode: "", country: "" },
      paymentDetails,
      status: "pending",
      paymentStatus: "pending",
      orderDate: new Date().toISOString(),
    };

    try {
      await dispatch(addOrder(orderData)).unwrap();

      toast.success(texts.checkout?.success || "✅ Sipariş başarıyla oluşturuldu!", {
        position: "top-center",
        autoClose: 3000,
      });

      dispatch(clearCart());
      navigate("/order-confirmation");
    } catch (error) {
      console.error("🚨 Sipariş oluşturma hatası:", error);
      toast.error(texts.checkout?.error || "❌ Sipariş oluşturulamadı!");
    }
  };

  if (!cartItems.length) {
    return (
      <CheckoutContainer theme={theme}>
        <Title theme={theme}>{texts.checkout?.title || "💳 Ödeme Sayfası"}</Title>
        <Label theme={theme}>{texts.checkout?.emptyCart || "🚫 Sepetiniz boş."}</Label>
        <Button theme={theme} onClick={() => navigate("/")}>
          {texts.checkout?.continueShopping || "🛒 Alışverişe Devam Et"}
        </Button>
      </CheckoutContainer>
    );
  }

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
            <strong>{texts.checkout?.totalPrice || "💰 Toplam Fiyat"}:</strong>
            <span>${totalPrice.toFixed(2)}</span>
          </SummaryItem>
          <SummaryItem theme={theme}>
            <strong>{texts.checkout?.vat || "📊 Vergi (KDV 19%)"}:</strong>
            <span>${vatAmount.toFixed(2)}</span>
          </SummaryItem>
          <SummaryItem theme={theme}>
            <strong>{texts.checkout?.shippingCost || "🚚 Kargo Ücreti"}:</strong>
            <span>${shippingCost.toFixed(2)}</span>
          </SummaryItem>
          <SummaryItem theme={theme}>
            <strong>{texts.checkout?.grandTotal || "🧾 Genel Toplam"}:</strong>
            <span>${grandTotal.toFixed(2)}</span>
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
