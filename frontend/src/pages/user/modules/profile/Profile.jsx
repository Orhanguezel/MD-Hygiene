import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserOrders } from "@/features/orders/ordersSlice";
import { fetchUserInvoices } from "@/features/invoices/invoicesSlice";
import { Link } from "react-router-dom";
import { ProfileContainer, Section, Button, Info } from "./styles/profileStyles";
import InvoiceList from "./components/InvoiceList";
import AddressInfo from "./components/AddressInfo";
import OrderHistory from "./components/OrderHistory";
import CartInfo from "./components/CartInfo";

const Profile = () => {
  const state = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.orders.userOrders);
  const invoices = useSelector((state) => state.invoices.userInvoices);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrders(user.id));
    dispatch(fetchUserInvoices(user.id));
  }, [dispatch, user.id]);


  return (
    <ProfileContainer>
      <h1>📋 Profil Bilgileri</h1>

      <Section>
        <Info>Email: {state.user.email}</Info>
        <Info>Rol: {state.user.role}</Info>
        <Link to={`/profile/${state.user.id}`}>
          <Button>Profil Düzenle</Button>
        </Link>
      </Section>

      {/* ✅ Fatura Listesi */}
      <InvoiceList userId={state.user.id} />

      {/* ✅ Sipariş Geçmişi */}
      <OrderHistory userId={state.user.id} />

      {/* ✅ Sepet Yönetimi */}
      <CartInfo />

      {/* ✅ Adres Bilgisi */}
      <AddressInfo />
    </ProfileContainer>
  );
};

export default Profile;
