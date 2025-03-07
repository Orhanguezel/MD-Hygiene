import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/features/categories/categorySlice"; // ✅ Kategorileri getir
import { fetchProducts, filterByCategory } from "@/features/products/productSlice"; // ✅ Ürünleri çek ve filtrele
import { useLanguage } from "@/features/language/useLanguage";
import {
  CategoryContainer,
  CategoryCard,
  CategoryImage,
  CategoryTitle,
  CategoryHeader,
} from "../styles/CategorySectionStyles";

const CategorySection = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category); // ✅ Kategorileri store'dan al
  const { selectedCategory } = useSelector((state) => state.product); // ✅ Seçili kategori bilgisini al
  const { texts } = useLanguage();

  useEffect(() => {
    dispatch(fetchCategories()); // ✅ Kategorileri yükle
    dispatch(fetchProducts()); // ✅ Ürünleri de yükle
  }, [dispatch]);

  // ✅ Kategoriler yüklenirken
  if (loading) return <p>{texts?.loading || "Yükleniyor..."}</p>;
  if (error) return <p>{texts?.error || "Hata oluştu!"}</p>;
  if (!categories || categories.length === 0)
    return <p>{texts?.noCategories || "Kategori bulunamadı."}</p>;

  return (
    <>
      <CategoryHeader>{texts?.home?.categoryTitle || "Kategoriler"}</CategoryHeader>
      <CategoryContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {categories.map((category) => (
          <CategoryCard
            key={category._id} // ✅ `_id` kullanıldı
            onClick={() => dispatch(filterByCategory(category._id))} // ✅ Seçili kategoriye göre filtrele
            $active={selectedCategory === category._id}
            whileTap={{ scale: 0.95 }}
          >
            <CategoryImage src={category.image} alt={category.name} />
            <CategoryTitle>{category.name}</CategoryTitle>
          </CategoryCard>
        ))}
      </CategoryContainer>
    </>
  );
};

export default CategorySection;
