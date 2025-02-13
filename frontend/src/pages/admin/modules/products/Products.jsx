import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/features/products/productSlice";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ManageStock from "./components/ManageStock"; // 📌 Stok Yönetimi
import ProductSidebar from "./components/ProductSidebar";
import { useLanguage } from "@/features/language/useLanguage"; 
import { useTheme } from "@/features/theme/useTheme"; 
import { ProductContainer } from "./styles/productStyles";      

const Products = () => {
  const [activeSection, setActiveSection] = useState("list"); // 📌 Sayfa ilk açıldığında ürün listesi gözükecek
  const { texts } = useLanguage();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const renderContent = () => {
    switch (activeSection) {
      case "create":
        return <ProductForm />;
      case "manageStock":
        return <ManageStock />;
      default:
        return <ProductList />;
    }
  };

  return (
    <ProductContainer theme={theme}>
      {/* 📌 Sidebar sabit kalacak ve her zaman gözükecek */}
      <ProductSidebar setActiveSection={setActiveSection} />
      <div style={{ padding: "20px", flexGrow: 1 }}>
        <h1>{texts?.products?.title || "Ürün Yönetimi"}</h1>
        {loading && <p>🔄 {texts?.products?.loading || "Yükleniyor..."}</p>}
        {error && <p>❌ {texts?.products?.error || "Bir hata oluştu!"}</p>}
        {renderContent()}
      </div>
    </ProductContainer>
  );
};

export default Products;
