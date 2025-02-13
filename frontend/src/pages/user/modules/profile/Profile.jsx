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
import { useLanguage } from "@/features/language/useLanguage";  // ✅ Dil desteği eklendi
import { useTheme } from "@/features/theme/useTheme";  // ✅ Tema desteği eklendi

const Profile = () => {
  const dispatch = useDispatch();
  const { texts } = useLanguage(); // ✅ Kullanıcı dil dosyasını al
  const { theme } = useTheme(); // ✅ Kullanıcı tema bilgisini al
  
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.orders.userOrders);
  const invoices = useSelector((state) => state.invoices.userInvoices || []); // ✅ Hata önleyici boş dizi varsayılan olarak eklendi

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserOrders(user.id));
      dispatch(fetchUserInvoices(user.id));
    }
  }, [dispatch, user?.id]);

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

      {/* ✅ Fatura Listesi */}
      {invoices?.length > 0 ? <InvoiceList userId={user?.id} /> : <p>{texts.profile.noInvoices}</p>}

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
