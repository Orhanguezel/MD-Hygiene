import { useLanguage } from "@/features/language/useLanguage";
import { SidebarContainer, SidebarButton } from "../styles/productStyles";

const ProductSidebar = ({ setActiveSection }) => {
  const { texts } = useLanguage();

  return (
    <SidebarContainer>
      <h3>{texts?.products?.sidebar || "Ürün Paneli"}</h3>
      <SidebarButton onClick={() => setActiveSection("list")}>
        📋 {texts?.products?.list || "Ürün Listesi"}
      </SidebarButton>
      <SidebarButton onClick={() => setActiveSection("create")}>
        ➕ {texts?.products?.add || "Ürün Ekle"}
      </SidebarButton>
      <SidebarButton onClick={() => setActiveSection("manageStock")}>
        📦 {texts?.products?.manageStock || "Fiyat ve Stok Yönetimi"}
      </SidebarButton>
    </SidebarContainer>
  );
};

export default ProductSidebar;
