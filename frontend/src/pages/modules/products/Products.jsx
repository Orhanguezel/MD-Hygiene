import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "@/features/products/productSlice";
import { useTheme } from "@/features/theme/useTheme";
import { useLanguage } from "@/features/language/useLanguage";
import { Outlet } from "react-router-dom"; // 📌 Outlet ekledik
import { ProductContainer, ContentContainer, PageTitle } from "./styles/productStyles";
import ProductSidebar from "./components/ProductSidebar";

const Products = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { texts } = useLanguage();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <ProductContainer theme={theme}>
      {/* ✅ Sidebar her zaman burada olacak */}
      <ProductSidebar />

      {/* ✅ İçerik alanı değişecek */}
      <ContentContainer theme={theme}>
        <PageTitle>{texts?.products?.title || "Ürün Yönetimi"}</PageTitle>
        <Outlet /> {/* 📌 Dinamik içerik burada gösterilecek */}
      </ContentContainer>
    </ProductContainer>
  );
};

export default Products;
