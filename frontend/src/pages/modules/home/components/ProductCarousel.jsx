import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites, toggleFavorite } from "@/features/favorites/favoriteSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CarouselContainer,
  ProductCard,
  ProductImage,
  ProductTitle,
  ProductPrice,
  AddToCartButton,
  BuyNowButton,
  FavoriteIcon,
  StockStatus,
  ProductLabel,
  CarouselWrapper,
} from "../styles/ProductCarouselStyles";

const ProductCarousel = () => {
  const { texts } = useLanguage();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { favorites } = useSelector((state) => state.favorite);
  const { filteredProducts } = useSelector((state) => state.product);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user); // ✅ Kullanıcı kontrolü

  const [offset, setOffset] = useState(0);
  const [direction, setDirection] = useState(-1);
  const [speed, setSpeed] = useState(1.5);
  const [isPaused, setIsPaused] = useState(false);

  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  useEffect(() => {
    if (filteredProducts?.length > 0 && !isPaused) {
      const interval = setInterval(() => {
        setOffset((prev) => {
          const newOffset = prev + direction * (220 * speed);
          if (newOffset < -filteredProducts.length * 220 + window.innerWidth * 0.5) {
            setDirection(1);
          } else if (newOffset > 0) {
            setDirection(-1);
          }
          return newOffset;
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [filteredProducts, direction, speed, isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const handleDragStart = (e) => {
    touchStartX.current = e.clientX || e.touches[0].clientX;
  };

  const handleDragEnd = (e) => {
    touchEndX.current = e.clientX || e.changedTouches[0].clientX;
    const diff = touchEndX.current - touchStartX.current;

    if (Math.abs(diff) > 50) {
      setDirection(diff > 0 ? 1 : -1);
      setSpeed(Math.min(3, Math.abs(diff) / 100));
    }
  };

  const handleAddToCart = (product, event) => {
    event.stopPropagation();
    if (!product || !product.id) {
      toast.error(texts?.product?.toast?.invalidProduct || "❌ Sepete eklenmeye çalışılan ürün geçersiz!");
      return;
    }
    dispatch(addToCart(product))
      .unwrap()
      .then(() => toast.success(texts?.product?.toast?.addedToCart || "✅ Ürün sepete eklendi!"))
      .catch(() => toast.error(texts?.product?.toast?.failedToAdd || "❌ Ürün sepete eklenemedi!"));
  };

  const handleBuyNow = (product, event) => {
    event.stopPropagation();

    if (!user) {
      toast.warning(texts?.product?.toast?.loginToBuy || "⚠️ Satın almak için giriş yapmalısınız!");
      navigate("/login");
      return;
    }

    dispatch(addToCart(product))
      .unwrap()
      .then(() => {
        toast.success(
          texts?.product?.toast?.redirectToCheckout || "✅ Ürün sepete eklendi! Ödeme sayfasına yönlendiriliyorsunuz..."
        );
        navigate("/checkout");
      })
      .catch(() => toast.error(texts?.product?.toast?.failedToAdd || "❌ Ürün sepete eklenemedi!"));
  };

  return (
    <CarouselContainer theme={theme}>
      <h2>{texts?.home?.featuredProducts || "Öne Çıkan Ürünler"}</h2>
      <CarouselWrapper
        ref={carouselRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        <motion.div
          animate={{ x: offset }}
          transition={{ ease: "linear", duration: 1 }}
          style={{ display: "flex", gap: "15px", minWidth: "100%" }}
        >
          {filteredProducts?.map((product, index) => {
            const stockMessage =
              product.stock > 0 ? texts?.product?.inStock || "✅ Stokta Var" : texts?.product?.outOfStock || "⚠️ Stok Yok";
            return (
              <ProductCard key={index} theme={theme} onClick={() => navigate(`/product/${product.id}`)}>
                {product.isNew && <ProductLabel theme={theme}>🔥 {texts?.home?.newProduct || "Yeni"}</ProductLabel>}
                <ProductImage src={product.images?.[0] || "/placeholder.jpg"} alt={product.title} />
                <ProductTitle theme={theme}>{product.title}</ProductTitle>
                <ProductPrice theme={theme}>${product.price}</ProductPrice>
                <StockStatus theme={theme}>{stockMessage}</StockStatus>

                <AddToCartButton theme={theme} onClick={(e) => handleAddToCart(product, e)} disabled={product.stock === 0}>
                  {texts?.product?.addToCart || "Sepete Ekle"}
                </AddToCartButton>

                <BuyNowButton theme={theme} onClick={(e) => handleBuyNow(product, e)}>
                  {texts?.product?.buyNow || "Hemen Al"}
                </BuyNowButton>

                <FavoriteIcon
                  theme={theme}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleFavorite(product.id));
                    toast.info(
                      favorites.includes(product.id)
                        ? texts?.product?.toast?.removedFromFavorites || "💔 Ürün favorilerden çıkarıldı!"
                        : texts?.product?.toast?.addedToFavorites || "❤️ Ürün favorilere eklendi!"
                    );
                  }}
                  $favorited={favorites.includes(product.id) ? "true" : undefined}
                >
                  {favorites.includes(product.id) ? "❤️" : "🤍"}
                </FavoriteIcon>
              </ProductCard>
            );
          })}
        </motion.div>
      </CarouselWrapper>
    </CarouselContainer>
  );
};

export default ProductCarousel;
