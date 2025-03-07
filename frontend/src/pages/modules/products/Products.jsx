import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "@/features/products/productSlice";
import { fetchCategories } from "@/features/categories/categorySlice"; // ✅ Kategoriler eklendi
import { useTheme } from "@/features/theme/useTheme";
import { useLanguage } from "@/features/language/useLanguage";
import { Outlet } from "react-router-dom";
import { ProductContainer, ContentContainer, PageTitle } from "./styles/productStyles";
import ProductSidebar from "./components/ProductSidebar";

const Products = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { texts } = useLanguage();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories()); // ✅ Kategoriler de çekiliyor
  }, [dispatch]);

  return (
    <ProductContainer theme={theme}>
      <ProductSidebar />
      <ContentContainer theme={theme}>
        <PageTitle>{texts?.products?.title || "Ürün Yönetimi"}</PageTitle>
        <Outlet />
      </ContentContainer>
    </ProductContainer>
  );
};

export default Products;
