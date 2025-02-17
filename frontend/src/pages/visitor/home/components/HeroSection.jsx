import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/features/products/productSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/features/language/useLanguage"; // ✅ Dil desteği eklendi
import {
  CarouselContainer,
  CarouselInfo,
  Slide,
  CarouselNavButton,
  PriceBox,
  ActionButtons,
  Button,
} from "../styles/HeroSectionStyles";

const HeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.product);
  const theme = useSelector((state) => state.theme);
  const { texts } = useLanguage(); // ✅ Dil dosyalarından metinleri almak için

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) =>
          prev === products.length - 1 ? 0 : prev + 1
        );
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [products]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleAddToCart = (product, event) => {
    event.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleBuyNow = (product, event) => {
    event.stopPropagation();
    dispatch(addToCart(product));
    navigate("/checkout");
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) return <p>{texts?.loading || "Yükleniyor..."}</p>;
  if (error) return <p>{texts?.error || "Hata oluştu!"}</p>;

  const currentProduct = products[currentSlide] || {};

  return (
    <CarouselContainer theme={theme}>
      <CarouselInfo theme={theme} key={currentProduct.id || currentSlide}>
        <motion.h2
          key={`title-${currentSlide}`}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {currentProduct.title || texts?.noProducts || "Ürün Bulunamadı"}
        </motion.h2>

        <motion.p
          key={`desc-${currentSlide}`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {currentProduct.description?.substring(0, 100) ||
            texts?.noDescription || "Açıklama bulunamadı"}
          ...
        </motion.p>

        {/* ✅ Fiyat Bilgisi + Butonlar */}
        <motion.div
          key={`price-${currentSlide}`}
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <ActionButtons>
            <Button
              theme={theme}
              onClick={(e) => handleAddToCart(currentProduct, e)}
            >
              {texts?.home.addToCart || "Sepete Ekle"}
            </Button>

            <Button
              theme={theme}
              onClick={(e) => handleBuyNow(currentProduct, e)}
            >
              💳 {texts?.home.buyNow || "Satın Al"}
            </Button>
          </ActionButtons>

          <PriceBox theme={theme}>
            {currentProduct.price
              ? `${currentProduct.price}$`
              : texts?.home.price || "Fiyat Bilgisi Yok"}
          </PriceBox>
        </motion.div>
      </CarouselInfo>

      {/* ✅ Tıklanabilir Resim (Ürün Detay Sayfasına Yönlendiriyor) */}
      <Slide
        theme={theme}
        onClick={() => handleProductClick(currentProduct.id)}
      >
        <motion.img
          key={`image-${currentSlide}`}
          src={currentProduct.images?.[0] || "/placeholder.jpg"}
          alt={currentProduct.title || "Ürün Resmi"}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "400px",
            objectFit: "cover",
            cursor: "pointer",
          }}
        />
      </Slide>

      <CarouselNavButton
        theme={theme}
        $left
        onClick={() =>
          goToSlide(currentSlide === 0 ? products.length - 1 : currentSlide - 1)
        }
      >
        ◀
      </CarouselNavButton>

      <CarouselNavButton
        theme={theme}
        onClick={() => goToSlide((currentSlide + 1) % products.length)}
      >
        ▶
      </CarouselNavButton>
    </CarouselContainer>
  );
};

export default HeroSection;
