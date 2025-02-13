import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/features/cart/cartSlice";
import { addOrder } from "@/features/orders/ordersSlice";
import { useState } from "react";
import { toast } from "react-toastify";
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

  const VAT_RATE = 0.19; // Almanya standart vergi oranı (%19)
  const SHIPPING_COST = 20;
  const vatAmount = totalPrice * VAT_RATE;
  const grandTotal = totalPrice + vatAmount + SHIPPING_COST;

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

  const handleCheckout = (e) => {
    e.preventDefault();
  
    const newOrder = {
      id: `ORD-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      date: new Date().toISOString(),
      items: cartItems.map((item) => ({
        productId: item.id,
        title: item.title,
        quantity: item.quantity,
        unitPrice: item.price,
        taxRate: 19, // Almanya vergi oranı
      })),
      totalAmount: totalPrice,
      shippingCost: SHIPPING_COST,
      status: "pending",
      paymentStatus: "pending",
      orderDate: new Date().toISOString(),
    };
  
    dispatch(addOrder(newOrder));
    toast.success("✅ Sipariş başarıyla oluşturuldu!");
    dispatch(clearCart());
  };
  

  return (
    <CheckoutContainer>
      <Title>💳 Ödeme Sayfası</Title>

      <PaymentForm onSubmit={handleCheckout}>
        <CardDetails>
          <Label>Kart Sahibi Adı</Label>
          <Input
            type="text"
            name="name"
            value={paymentDetails.name}
            onChange={handleChange}
            required
          />

          <Label>Kart Numarası</Label>
          <Input
            type="text"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            required
          />

          <Label>Son Kullanma Tarihi (MM/YY)</Label>
          <Input
            type="text"
            name="expiryDate"
            value={paymentDetails.expiryDate}
            onChange={handleChange}
            placeholder="12/25"
            required
          />

          <Label>CVV</Label>
          <Input
            type="password"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handleChange}
            placeholder="123"
            required
          />
        </CardDetails>

        <Summary>
          <SummaryItem>Toplam Fiyat: ${totalPrice.toFixed(2)}</SummaryItem>
          <SummaryItem>KDV (%19): ${vatAmount.toFixed(2)}</SummaryItem>
          <SummaryItem>Kargo Ücreti: ${SHIPPING_COST.toFixed(2)}</SummaryItem>
          <SummaryItem style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            Genel Toplam: ${grandTotal.toFixed(2)}
          </SummaryItem>
        </Summary>

        <Button type="submit">💸 Ödemeyi Tamamla</Button>
      </PaymentForm>
    </CheckoutContainer>
  );
};

export default Checkout;
