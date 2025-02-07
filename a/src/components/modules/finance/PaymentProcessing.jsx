import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { processPayment } from "../../api/paymentApi";
import {
  PaymentContainer,
  Input,
  SubmitButton,
} from "../../styles/dashboardStyles";

const PaymentProcessing = () => {
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("stripe");

  const handlePayment = async () => {
    try {
      const paymentData = { amount, method };
      const result = await processPayment(paymentData, user.token);
      alert(`Ödeme Başarılı: ${result.message}`);
    } catch (error) {
      console.error("Ödeme hatası:", error);
    }
  };

  return (
    <PaymentContainer>
      <h3>💰 Ödeme İşlemi</h3>
      <Input type="number" placeholder="Tutar (€)" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <select value={method} onChange={(e) => setMethod(e.target.value)}>
        <option value="stripe">Stripe</option>
        <option value="paypal">PayPal</option>
        <option value="klarna">Klarna</option>
      </select>
      <SubmitButton onClick={handlePayment}>Ödeme Yap</SubmitButton>
    </PaymentContainer>
  );
};

export default PaymentProcessing;
