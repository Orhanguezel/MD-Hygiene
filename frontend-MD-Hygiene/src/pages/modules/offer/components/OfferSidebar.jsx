import React from "react";
import { useLanguage } from "@/features/language/useLanguage";  // ✅ RTK Dil Yönetimi
import { useTheme } from "@/features/theme/useTheme";           // ✅ RTK Tema Yönetimi
import {
  SidebarContainer,
  SidebarTitle,
  SidebarList,
  SidebarItem,
  SidebarButton,
} from "../styles/offerStyles";  // ✅ Stil dosyası

const OfferSidebar = ({ setActiveSection }) => {
  const { texts } = useLanguage();
  const { theme } = useTheme();

  return (
    <SidebarContainer theme={theme}>
      <SidebarTitle theme={theme}>
        {texts?.offers?.sidebarTitle || "Teklif Yönetimi"}
      </SidebarTitle>

      <SidebarList>
        <SidebarItem>
          <SidebarButton theme={theme} onClick={() => setActiveSection("list")}>
            📋 {texts?.offers?.list || "Teklif Listesi"}
          </SidebarButton>
        </SidebarItem>

        <SidebarItem>
          <SidebarButton theme={theme} onClick={() => setActiveSection("create")}>
            ➕ {texts?.offers?.create || "Yeni Teklif Oluştur"}
          </SidebarButton>
        </SidebarItem>

        <SidebarItem>
          <SidebarButton theme={theme} onClick={() => setActiveSection("pdf")}>
            📄 {texts?.offers?.pdf || "PDF Görüntüle"}
          </SidebarButton>
        </SidebarItem>

        <SidebarItem>
          <SidebarButton theme={theme} onClick={() => setActiveSection("addProduct")}>
            📦 {texts?.offers?.addProduct || "Ürün Ekle"}
          </SidebarButton>
        </SidebarItem>

        <SidebarItem>
          <SidebarButton theme={theme} onClick={() => setActiveSection("shipping")}>
            🚚 {texts?.offers?.setShipping || "Nakliye Ücreti"}
          </SidebarButton>
        </SidebarItem>
      </SidebarList>
    </SidebarContainer>
  );
};

export default OfferSidebar;
