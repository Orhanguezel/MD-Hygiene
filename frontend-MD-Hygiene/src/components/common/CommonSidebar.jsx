import { NavLink } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { SidebarContainer, NavContainer, NavItem } from "@/styles/sidebarStyles";

export default function CommonSidebar() {
  const { texts } = useLanguage();

  return (
    <SidebarContainer>
      <NavContainer>
        <NavItem as={NavLink} to="dashboard" activeclassname="active">
          {texts.sidebar.dashboard}
        </NavItem>
        <NavItem as={NavLink} to="users" activeclassname="active">
          {texts.sidebar.users}
        </NavItem>
        <NavItem as={NavLink} to="stores" activeclassname="active">
          {texts.sidebar.stores}
        </NavItem>
        <NavItem as={NavLink} to="products" activeclassname="active">
          {texts.sidebar.products}
        </NavItem>
        <NavItem as={NavLink} to="sales" activeclassname="active">
          {texts.sidebar.sales}
        </NavItem>
        <NavItem as={NavLink} to="shipments" activeclassname="active">
          {texts.sidebar.shipments}
        </NavItem>
        <NavItem as={NavLink} to="orders" activeclassname="active">
          {texts.sidebar.orders}
        </NavItem>
        <NavItem as={NavLink} to="invoices" activeclassname="active">
          {texts.sidebar.invoices}
        </NavItem>
        <NavItem as={NavLink} to="notifications" activeclassname="active">
          {texts.sidebar.notifications}
        </NavItem>
        <NavItem as={NavLink} to="reports" activeclassname="active">
          {texts.sidebar.reports}
        </NavItem>
        <NavItem as={NavLink} to="offers" activeclassname="active">
          {texts.sidebar.offers}
        </NavItem>
        <NavItem as={NavLink} to="audit-logs" activeclassname="active">
          {texts.sidebar.auditLogs}
        </NavItem>
        <NavItem as={NavLink} to="settings" activeclassname="active">
          {texts.sidebar.settings}
        </NavItem>
      </NavContainer>
    </SidebarContainer>
  );
}
