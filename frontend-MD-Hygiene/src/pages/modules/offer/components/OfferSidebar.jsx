// ✅ src/features/offer/components/OfferSidebar.jsx
import { SidebarContainer, SidebarButton, SidebarTitle } from "../styles/offerStyles";
import { useSelector } from "react-redux"; // ✅ RTK kullanımı

const OfferSidebar = ({ setActiveSection }) => {
  const texts = useSelector((state) => state.language.texts); // ✅ RTK ile dil verilerini çekiyoruz

  return (
    <SidebarContainer>
      <SidebarTitle>{texts?.offers?.title || "📋 Teklifler"}</SidebarTitle>
      <SidebarButton onClick={() => setActiveSection("list")}>{texts?.offers?.listSidebar || "📋 Teklif Listesi"}</SidebarButton>
      <SidebarButton onClick={() => setActiveSection("create")}>{texts?.offers?.create || "➕ Yeni Teklif Oluştur"}</SidebarButton>
      <SidebarButton onClick={() => setActiveSection("addProduct")}>{texts?.offers?.addProduct || "🛒 Ürün Ekle"}</SidebarButton>
      <SidebarButton onClick={() => setActiveSection("shipping")}>{texts?.offers?.shippingCost || "🚚 Nakliye Ücreti"}</SidebarButton>
      <SidebarButton onClick={() => setActiveSection("archive")}>{texts?.offers?.archivedTitle || "🗂️ Arşivlenmiş Teklifler"}</SidebarButton>
    </SidebarContainer>
  );
};

export default OfferSidebar; 
