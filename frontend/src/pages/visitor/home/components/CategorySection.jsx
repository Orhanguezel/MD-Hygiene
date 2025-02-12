// ✅ src/pages/visitor/home/components/CategorySection.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  CategoryContainer,
  CategoryCard,
  CategoryImage,
  CategoryTitle,
} from "../styles/CategorySectionStyles";

const CategorySection = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/data");
        const products = response.data;

        const uniqueCategories = [
          ...new Map(products.map((item) => [item.category.id, item.category])).values(),
        ];

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Kategori verileri alınamadı:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoryContainer>
      {categories.map((category) => (
        <CategoryCard key={category.id} onClick={() => onCategoryClick(category.id)}>
          <CategoryImage src={category.image} alt={category.name} />
          <CategoryTitle>{category.name}</CategoryTitle>
        </CategoryCard>
      ))}
    </CategoryContainer>
  );
};

export default CategorySection;