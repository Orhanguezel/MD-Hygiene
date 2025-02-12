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
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [products]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  const currentProduct = products[currentSlide];

  return (
    <CarouselContainer>
      <CarouselInfo>
        <h2>{currentProduct?.title}</h2>
        <p>{currentProduct?.description.substring(0, 100)}...</p>
      </CarouselInfo>
        <Slide>
          <SlideImage src={currentProduct?.images[0]} alt={currentProduct?.title} />
          <SlideContent>
            <p>{currentProduct?.price}$</p>
          </SlideContent>
        </Slide>

        <CarouselNavButton left onClick={() => goToSlide(currentSlide === 0 ? products.length - 1 : currentSlide - 1)}>
          ◀
        </CarouselNavButton>
        <CarouselNavButton onClick={() => goToSlide((currentSlide + 1) % products.length)}>
          ▶
        </CarouselNavButton>

    </CarouselContainer>
  );
};

export default HeroSection;
