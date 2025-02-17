// ✅ src/pages/visitor/home/Home.jsx
import { useSelector } from "react-redux";
import HeroSection from "./components/HeroSection";
import CategorySection from "./components/CategorySection";
import ProductCarousel from "./components/ProductCarousel";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import { HomeContainer } from "./styles/HomeStyles";
import { useState } from "react";

const Home = () => {
  const theme = useSelector((state) => state.theme); // ✅ Redux Toolkit Theme
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <HomeContainer theme={theme}>
      <HeroSection />
      <CategorySection onCategoryClick={setSelectedCategory} />
      <ProductCarousel selectedCategory={selectedCategory} />
      <Testimonials />
      <Newsletter />
    </HomeContainer>
  );
};

export default Home;
