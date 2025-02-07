import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { getPaymentMethods } from "../../api/paymentApi";
import {
  PaymentContainer,
  PaymentOption,
} from "../../styles/dashboardStyles";

const PaymentMethods = () => {
  const { user } = useContext(AuthContext);
  const [methods, setMethods] = useState([]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      if (!user?.token) return;
      try {
        const data = await getPaymentMethods(user.token);
        setMethods(data);
      } catch (error) {
        console.error("Ödeme yöntemleri alınamadı:", error);
      }
    };

    fetchPaymentMethods();
  }, [user]);

  return (
    <PaymentContainer>
      <h3>💳 Ödeme Yöntemleri</h3>
      {methods.map((method) => (
        <PaymentOption key={method.id}>{method.name}</PaymentOption>
      ))}
    </PaymentContainer>
  );
};

export default PaymentMethods;
