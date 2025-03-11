import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/features/categories/categorySlice"; 
import { fetchProducts, filterByCategory } from "@/features/products/productSlice"; 
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
  const { categories, loading, error } = useSelector((state) => state.category); 
  const { selectedCategory } = useSelector((state) => state.product); 
  const { texts } = useLanguage();

  useEffect(() => {
    dispatch(fetchCategories()); 
    dispatch(fetchProducts()); 
  }, [dispatch]);

  useEffect(() => {
    console.log("📌 API’den Gelen Kategoriler:", categories);
    console.log("📌 Seçili Kategori:", selectedCategory);
  }, [categories, selectedCategory]);

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
        {/* 📌 Sadece API’den Gelen Kategoriler Gösterilecek */}
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            onClick={() => dispatch(filterByCategory(category._id))}
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
