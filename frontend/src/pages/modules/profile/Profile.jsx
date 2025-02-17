import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserOrders } from "@/features/orders/ordersSlice";
import { fetchInvoices } from "@/features/invoices/invoicesSlice";
import { fetchCompanyInfo } from "@/features/company/companySlice"; // ✅ Şirket bilgisi çekiliyor
import generateInvoicePDF from "@/pages/modules/invoices/components/pdfGenerator";
import { Link } from "react-router-dom";
import { ProfileContainer, Section, Button, Info, Card, CardHeader, CardContent, ActionButton } from "./styles/profileStyles";
import { useLanguage } from "@/features/language/useLanguage";  
import { useTheme } from "@/features/theme/useTheme";  
import CartInfo from "./components/CartInfo";
import AddressInfo from "./components/AddressInfo";
import { FaFilePdf } from "react-icons/fa"; // ✅ PDF simgesi ekledik

const Profile = () => {
  const dispatch = useDispatch();
  const { texts } = useLanguage();
  const { theme } = useTheme();
  
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.orders.userOrders);
  const invoices = useSelector((state) => state.invoices.invoices || []);
  const company = useSelector((state) => state.company.company); // ✅ Şirket bilgisi Redux'tan alındı

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserOrders(user.id));
      dispatch(fetchInvoices());
      dispatch(fetchCompanyInfo()); // ✅ Şirket bilgisi çekiliyor
    }
  }, [dispatch, user?.id]);

  const userInvoices = invoices.filter((invoice) => invoice.userId === user.id);

  // ✅ **Fatura PDF İndir Butonu**
  const handleDownloadPDF = (invoice) => {
    if (!invoice || !company) {
      console.error("❌ Eksik veri: Fatura veya şirket bilgisi bulunamadı!");
      return;
    }

    generateInvoicePDF(invoice, company); // ✅ Şirket bilgisi ve fatura bilgisi fonksiyona gönderiliyor
  };

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

      {/* ✅ Kullanıcının Faturalarını Göster */}
      <Card theme={theme}>
        <CardHeader>{texts.profile.invoices || "📜 Faturalarım"}</CardHeader>
        <CardContent>
          {userInvoices.length > 0 ? (
            userInvoices.map((invoice) => (
              <p key={invoice.id}>
                <strong>📄 {texts.profile.invoiceNumber || "Fatura No"}:</strong> {invoice.invoiceNumber} <br />
                <strong>📅 {texts.profile.date || "Tarih"}:</strong> {invoice.issuedAt} <br />
                <strong>💰 {texts.profile.amount || "Tutar"}:</strong> {parseFloat(invoice.totalAmount).toFixed(2)} ₺

                {/* ✅ PDF İndirme Butonu */}
                <ActionButton onClick={() => handleDownloadPDF(invoice)}>
                  <FaFilePdf /> {texts?.invoice?.downloadPDF || "PDF İndir"}
                </ActionButton>
              </p>
            ))
          ) : (
            <p>{texts.profile.noInvoices || "⚠️ Henüz faturanız bulunmamaktadır."}</p>
          )}
        </CardContent>
      </Card>

      {/* ✅ Kullanıcının Sipariş Geçmişini Göster */}
      <Card theme={theme}>
        <CardHeader>{texts.profile.orders || "📦 Siparişlerim"}</CardHeader>
        <CardContent>
          {orders?.length > 0 ? (
            orders.map((order) => (
              <p key={order.id}>
                <strong>📄 {texts.profile.orderID || "Sipariş No"}:</strong> {order.id} <br />
                <strong>📅 {texts.profile.date || "Tarih"}:</strong> {order.orderDate} <br />
                <strong>💰 {texts.profile.amount || "Tutar"}:</strong> {parseFloat(order.totalAmount).toFixed(2)} ₺ <br />
                <strong>📌 {texts.profile.status || "Durum"}:</strong> {texts.orders[order.status] || order.status}
              </p>
            ))
          ) : (
            <p>{texts.profile.noOrders || "⚠️ Henüz siparişiniz bulunmamaktadır."}</p>
          )}
        </CardContent>
      </Card>

      {/* ✅ Sepet Yönetimi */}
      <CartInfo />

      {/* ✅ Adres Bilgisi */}
      <AddressInfo />
    </ProfileContainer>
  );
};

export default Profile;
