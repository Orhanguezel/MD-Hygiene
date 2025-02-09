import { NavLink } from "react-router-dom";
import { useLanguage } from "@/features/language/useLanguage"; // ✅ RTK Hook kullanımı
import { SidebarContainer, NavContainer, NavItem } from "@/styles/sidebarStyles";

export default function CommonSidebar() {
  const { texts } = useLanguage(); // ✅ RTK'dan gelen metin verisi

  return (
    <SidebarContainer>
      <NavContainer>
        <NavItem as={NavLink} to="dashboard" activeclassname="active">
          {texts?.sidebar?.dashboard || "Dashboard"}
        </NavItem>
        <NavItem as={NavLink} to="users" activeclassname="active">
          {texts?.sidebar?.users || "Kullanıcılar"}
        </NavItem>
        <NavItem as={NavLink} to="stores" activeclassname="active">
          {texts?.sidebar?.stores || "Mağazalar"}
        </NavItem>
        <NavItem as={NavLink} to="products" activeclassname="active">
          {texts?.sidebar?.products || "Ürünler"}
        </NavItem>
        <NavItem as={NavLink} to="sales" activeclassname="active">
          {texts?.sidebar?.sales || "Satışlar"}
        </NavItem>
        <NavItem as={NavLink} to="shipments" activeclassname="active">
          {texts?.sidebar?.shipments || "Sevkiyatlar"}
        </NavItem>
        <NavItem as={NavLink} to="orders" activeclassname="active">
          {texts?.sidebar?.orders || "Siparişler"}
        </NavItem>
        <NavItem as={NavLink} to="invoices" activeclassname="active">
          {texts?.sidebar?.invoices || "Faturalar"}
        </NavItem>
        <NavItem as={NavLink} to="notifications" activeclassname="active">
          {texts?.sidebar?.notifications || "Bildirimler"}
        </NavItem>
        <NavItem as={NavLink} to="reports" activeclassname="active">
          {texts?.sidebar?.reports || "Raporlar"}
        </NavItem>
        <NavItem as={NavLink} to="offers" activeclassname="active">
          {texts?.sidebar?.offers || "Teklifler"}
        </NavItem>
        <NavItem as={NavLink} to="audit-logs" activeclassname="active">
          {texts?.sidebar?.auditLogs || "Denetim Kayıtları"}
        </NavItem>
        <NavItem as={NavLink} to="settings" activeclassname="active">
          {texts?.sidebar?.settings || "Ayarlar"}
        </NavItem>
      </NavContainer>
    </SidebarContainer>
  );
}
