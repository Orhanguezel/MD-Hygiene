import { useState } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ProductSidebar from "./components/ProductSidebar";
import { useLanguage } from "@/features/language/useLanguage"; // ✅ Dil desteği
import { useTheme } from "@/features/theme/useTheme";           // ✅ Tema desteği
import { ProductContainer } from "./styles/productStyles";      // ✅ Stiller eklendi

const Products = () => {
  const [activeSection, setActiveSection] = useState("list");
  const { texts } = useLanguage();
  const { theme } = useTheme();

  const renderContent = () => {
    switch (activeSection) {
      case "create":
        return <ProductForm />;
      default:
        return <ProductList />;
    }
  };

  return (
    <ProductContainer theme={theme}>
      <ProductSidebar setActiveSection={setActiveSection} />
      <div style={{ padding: "20px", flexGrow: 1 }}>
        <h1>{texts?.products?.title || "Ürün Yönetimi"}</h1>
        {renderContent()}
      </div>
    </ProductContainer>
  );
};

export default Products;
