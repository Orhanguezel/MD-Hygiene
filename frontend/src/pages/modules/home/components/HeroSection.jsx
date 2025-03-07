import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/features/products/productSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/features/language/useLanguage";
import { toast } from "react-toastify"; // ✅ Toastify Eklendi
import "react-toastify/dist/ReactToastify.css"; // ✅ Toastify Stili
import {
  HeroContainer,
  HeroContent,
  HeroImageWrapper,
  PriceTag,
  ButtonsWrapper,
  CTAButton,
} from "../styles/HeroSectionStyles";

const HeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.product);
  const theme = useSelector((state) => state.theme);
  const { texts } = useLanguage();
  const user = useSelector((state) => state.auth.user); // ✅ Kullanıcı kontrolü için Redux state

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    let interval;
    if (products && products.length > 0) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [products]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = (product, event) => {
    event.stopPropagation();
    dispatch(addToCart(product));
    toast.success(`${product.title} sepete eklendi!`);
  };

  const handleBuyNow = (product, event) => {
    event.stopPropagation();

    if (!user) {
      toast.warn("Alışveriş yapabilmek için giriş yapmalısınız!");
      navigate("/login");
      return;
    }

    dispatch(addToCart(product));
    navigate("/checkout");
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  if (loading) return <p>{texts?.loading || "Yükleniyor..."}</p>;
  if (error) return <p>{texts?.error || "Hata oluştu!"}</p>;
  if (!products || products.length === 0) return <p>{texts?.noProducts || "Ürün bulunamadı."}</p>;

  const currentProduct = products[currentSlide];

  return (
    <HeroContainer theme={theme}>
      <HeroContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h2>{currentProduct.title}</motion.h2>
            <motion.p>
              {currentProduct.description.substring(0, 100)}...
            </motion.p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <PriceTag>
            {currentProduct.price ? `${currentProduct.price}$` : texts?.home.price || "Fiyat Bilgisi Yok"}
          </PriceTag>

          <ButtonsWrapper>
            <CTAButton theme={theme} onClick={(e) => handleAddToCart(currentProduct, e)}>
              {texts?.home.addToCart || "Sepete Ekle"}
            </CTAButton>

            <CTAButton theme={theme} onClick={(e) => handleBuyNow(currentProduct, e)} variant="primary">
              💳 {texts?.home.buyNow || "Hemen Al"}
            </CTAButton>
          </ButtonsWrapper>
        </motion.div>
      </HeroContent>

      <HeroImageWrapper onClick={() => handleProductClick(currentProduct)}>
        <motion.img
          key={`image-${currentProduct.id}`}
          src={
            currentProduct.images && currentProduct.images.length > 0
              ? currentProduct.images[0]
              : "/placeholder.jpg"
          }
          alt={currentProduct.title || "Ürün Resmi"}
          animate={{
            x: [-5, 5, -5],
            transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
          whileHover={{ scale: 1.03 }}
        />
      </HeroImageWrapper>
    </HeroContainer>
  );
};

export default HeroSection;
