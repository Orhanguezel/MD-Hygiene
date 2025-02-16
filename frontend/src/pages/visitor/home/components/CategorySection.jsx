import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  filterByCategory,
} from "@/features/products/productSlice";
import {
  CategoryContainer,
  CategoryCard,
  CategoryImage,
  CategoryTitle,
} from "../styles/CategorySectionStyles";

const CategorySection = () => {
  const dispatch = useDispatch();
  const { products, selectedCategory } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts()); // ✅ Ürünleri çek
  }, [dispatch]);

  // 📌 Ürünler içindeki kategorileri al, tekrar edenleri kaldır
  const uniqueCategories = [
    ...new Map(
      products.map((item) => [item.category.id, item.category])
    ).values(),
  ];

  const handleCategoryClick = (categoryId) => {
    dispatch(filterByCategory(categoryId));
    console.log("📌 Seçilen Kategori:", categoryId); // ✅ Konsolda kontrol et
  };

  return (
    <CategoryContainer>
      {/* 📌 Tüm Ürünler Seçeneği */}
      <CategoryCard
        onClick={() => handleCategoryClick(null)}
        $active={!selectedCategory} // ✅ `$active` olarak değiştirildi!
      >
        <CategoryTitle>📌 Tüm Ürünler</CategoryTitle>
      </CategoryCard>

      {uniqueCategories.map((category) => (
        <CategoryCard
          key={category.id}
          onClick={() => dispatch(filterByCategory(category.id))}
          $active={selectedCategory === category.id} // ✅ `$active` olarak değiştirildi!
        >
          <CategoryImage src={category.image} alt={category.name} />
          <CategoryTitle>{category.name}</CategoryTitle>
        </CategoryCard>
      ))}
    </CategoryContainer>
  );
};

export default CategorySection;
