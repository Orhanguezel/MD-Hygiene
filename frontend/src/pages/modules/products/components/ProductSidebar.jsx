import { useNavigate } from "react-router-dom";
import { SidebarContainer, SidebarButton } from "../styles/productStyles";
import { useLanguage } from "@/features/language/useLanguage";

const ProductSidebar = () => {
  const { texts } = useLanguage();
  const navigate = useNavigate();

  return (
    <SidebarContainer>
      <h3>{texts?.products?.sidebar || "Ürün Paneli"}</h3>
      <SidebarButton onClick={() => navigate("/products")}>
        📋 {texts?.products?.list || "Ürün Listesi"}
      </SidebarButton>
      <SidebarButton onClick={() => navigate("/products/add")}>
        ➕ {texts?.products?.add || "Ürün Ekle"}
      </SidebarButton>
      <SidebarButton onClick={() => navigate("/products/edit")}>
        ✏️ {texts?.products?.edit || "Ürün Güncelle"}
      </SidebarButton>
      <SidebarButton onClick={() => navigate("/products/manageStock")}>
        📦 {texts?.products?.manageStock || "Fiyat ve Stok Yönetimi"}
      </SidebarButton>
      <SidebarButton onClick={() => navigate("/products/categories")}>
        📁 {texts?.products?.manage || "Kategorileri Yönet"}
      </SidebarButton>
    </SidebarContainer>
  );
};

export default ProductSidebar;
