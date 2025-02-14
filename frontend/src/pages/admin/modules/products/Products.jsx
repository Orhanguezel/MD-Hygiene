import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchProducts } from "@/features/products/productSlice";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ManageStock from "./components/ManageStock";
import ProductSidebar from "./components/ProductSidebar";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { ProductContainer } from "./styles/productStyles";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { texts } = useLanguage();
  const { theme } = useTheme();
  const { loading, error } = useSelector((state) => state.product);

  // 📌 URL'ye göre aktif sekmeyi belirle
  const getSectionFromPath = () => {
    if (location.pathname.endsWith("/products/add")) return "add";
    if (location.pathname.endsWith("/products/manageStock")) return "manageStock";
    return "list";
  };

  const [activeSection, setActiveSection] = useState(getSectionFromPath());

  useEffect(() => {
    setActiveSection(getSectionFromPath());
  }, [location.pathname]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <ProductContainer theme={theme}>
      {/* 📌 Sidebar sabit kalacak */}
      <ProductSidebar setActiveSection={(section) => {
        setActiveSection(section);
        navigate(`/products/${section === "list" ? "" : section}`);
      }} />
      
      <div style={{ padding: "20px", flexGrow: 1 }}>
        <h1>{texts?.products?.title || "Ürün Yönetimi"}</h1>
        {loading && <p>🔄 {texts?.products?.loading || "Yükleniyor..."}</p>}
        {error && <p>❌ {texts?.products?.error || "Bir hata oluştu!"}</p>}

        {/* 📌 İçerik dinamik olarak değişecek */}
        {activeSection === "add" && <ProductForm />}
        {activeSection === "manageStock" && <ManageStock />}
        {activeSection === "list" && <ProductList />}
      </div>
    </ProductContainer>
  );
};

export default Products;
