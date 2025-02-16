import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/features/products/productSlice";
import {
  CarouselContainer,
  CarouselInfo,
  Slide,
  SlideImage,
  SlideContent,
  CarouselNavButton,
} from "../styles/HeroSectionStyles";

const HeroSection = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const theme = useSelector((state) => state.theme); // ✅ Redux Theme
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1));
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [products]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  const currentProduct = products[currentSlide] || {}; // ✅ Undefined hatasını önler

  return (
    <CarouselContainer theme={theme}>
      <CarouselInfo theme={theme}>
        <h2>{currentProduct.title || "Ürün Bulunamadı"}</h2>
        <p>{currentProduct.description?.substring(0, 100) || "Açıklama bulunamadı"}...</p>
      </CarouselInfo>
      <Slide theme={theme}>
        <SlideImage
          src={currentProduct.images?.[0] || "/placeholder.jpg"}
          alt={currentProduct.title || "Ürün Resmi"}
        />
        <SlideContent theme={theme}>
          <p>{currentProduct.price ? `${currentProduct.price}$` : "Fiyat Bilgisi Yok"}</p>
        </SlideContent>
      </Slide>

      <CarouselNavButton theme={theme}
        $left
        onClick={() =>
          goToSlide(currentSlide === 0 ? products.length - 1 : currentSlide - 1)
        }
      >
        ◀
      </CarouselNavButton>

      <CarouselNavButton theme={theme}
        onClick={() => goToSlide((currentSlide + 1) % products.length)}
      >
        ▶
      </CarouselNavButton>
    </CarouselContainer>
  );
};

export default HeroSection;
