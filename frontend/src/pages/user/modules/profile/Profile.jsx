import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserOrders } from "@/features/orders/ordersSlice";
import { fetchInvoices } from "@/features/invoices/invoicesSlice"; // ✅ fetchUserInvoices yerine fetchInvoices kullanıyoruz
import { Link } from "react-router-dom";
import { ProfileContainer, Section, Button, Info } from "./styles/profileStyles";
import InvoiceList from "./components/InvoiceList";
import AddressInfo from "./components/AddressInfo";
import OrderHistory from "./components/OrderHistory";
import CartInfo from "./components/CartInfo";
import { useLanguage } from "@/features/language/useLanguage";  
import { useTheme } from "@/features/theme/useTheme";  

const Profile = () => {
  const dispatch = useDispatch();
  const { texts } = useLanguage();
  const { theme } = useTheme();
  
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.orders.userOrders);
  const invoices = useSelector((state) => state.invoices.invoices || []); // ✅ Tüm faturalar Redux Store'dan çekiliyor

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserOrders(user.id));
      dispatch(fetchInvoices()); // ✅ Tüm faturaları çekiyoruz
    }
  }, [dispatch, user?.id]);

  // ✅ Kullanıcının faturalarını filtrele
  const userInvoices = invoices.filter((invoice) => invoice.userId === user.id);

  return (
    <ProfileContainer theme={theme}>
      <h1>{texts.profile.title}</h1>

      <Section theme={theme}>
        <Info theme={theme}>{texts.profile.email}: {user?.email || "-"}</Info>
        <Info theme={theme}>{texts.profile.role}: {user?.role || "-"}</Info>
        <Link to={`/profile/${user?.id}`}>
          <Button theme={theme}>{texts.profile.editProfile}</Button>
        </Link>
      </Section>

      {/* ✅ Kullanıcının faturalarını gösteriyoruz */}
      {userInvoices.length > 0 ? <InvoiceList invoices={userInvoices} /> : <p>{texts.profile.noInvoices}</p>}

      {/* ✅ Sipariş Geçmişi */}
      {orders?.length > 0 ? <OrderHistory userId={user?.id} /> : <p>{texts.profile.noOrders}</p>}

      {/* ✅ Sepet Yönetimi */}
      <CartInfo />

      {/* ✅ Adres Bilgisi */}
      <AddressInfo />
    </ProfileContainer>
  );
};

export default Profile;
