import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "@/features/language/useLanguage";
import {
  fetchProducts,
  filterByCategory,
} from "@/features/products/productSlice";
import {
  CategoryContainer,
  CategoryCard,
  CategoryImage,
  CategoryTitle,
  CategoryHeader,
} from "../styles/CategorySectionStyles";
import { motion } from "framer-motion";

const CategorySection = () => {
  const dispatch = useDispatch();
  const { products, selectedCategory } = useSelector((state) => state.product);
  const { texts } = useLanguage();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // 📌 Ürünler içindeki kategorileri al, tekrar edenleri kaldır
  const uniqueCategories = [
    ...new Map(
      products.map((item) => [item.category.id, item.category])
    ).values(),
  ];

  return (
    <>
      <CategoryHeader>{texts?.home?.categoryTitle || "Kategoriler"}</CategoryHeader>
      <CategoryContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {uniqueCategories.map((category) => (
          <CategoryCard
            key={category.id}
            onClick={() => dispatch(filterByCategory(category.id))}
            $active={selectedCategory === category.id}
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
