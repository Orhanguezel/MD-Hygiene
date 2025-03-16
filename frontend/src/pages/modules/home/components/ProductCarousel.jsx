import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites, toggleFavorite } from "@/features/favorites/favoriteSlice";
import { fetchProducts } from "@/features/products/productSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CarouselContainer,
  CarouselWrapper,
  ProductCard,
  ProductImage,
  ProductTitle,
  ProductPrice,
  AddToCartButton,
  BuyNowButton,
  FavoriteIcon,
  StockStatus,
  ProductLabel,
} from "../styles/ProductCarouselStyles";

const BASE_URL = "http://localhost:5010";

const ProductCarousel = () => {
  const { texts } = useLanguage();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favorites = useSelector((state) => state.favorite.favorites) || [];
  const products = useSelector((state) => state.product.products) || [];
  const filteredProducts = useSelector((state) => state.product.filteredProducts) || [];
  const user = useSelector((state) => state.auth.user);

  const [offset, setOffset] = useState(0);
  const [direction, setDirection] = useState(-1);
  const [speed, setSpeed] = useState(1.5);
  const [isPaused, setIsPaused] = useState(false);

  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (favorites.length === 0) {
      dispatch(fetchFavorites());
    }
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, favorites.length, products.length]);

  useEffect(() => {
    if (filteredProducts.length > 0 && !isPaused) {
      const interval = setInterval(() => {
        setOffset((prev) => {
          const maxOffset = -filteredProducts.length * 220 + window.innerWidth * 0.5;
          const newOffset = prev + direction * (220 * speed);

          if (newOffset < maxOffset) setDirection(1);
          if (newOffset > 0) setDirection(-1);

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

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        _id: product._id,
        quantity: 1,
        price: product.price,
        title: product.title,
        images: product.images,
      })
    )
      .unwrap()
      .then(() => toast.success("✅ Ürün sepete eklendi!"))
      .catch(() => toast.error("❌ Ürün sepete eklenemedi!"));
  };

  const handleBuyNow = (product, event) => {
    event.stopPropagation();

    if (!user) {
      toast.warning("⚠️ Satın almak için giriş yapmalısınız!");
      navigate("/login");
      return;
    }

    dispatch(
      addToCart({
        _id: product._id,
        quantity: 1,
        price: product.price,
        title: product.title,
        images: product.images,
      })
    )
      .unwrap()
      .then(() => navigate("/checkout"))
      .catch(() => toast.error("❌ Ürün sepete eklenemedi!"));
  };

  const handleToggleFavorite = (product, e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(product))
      .unwrap()
      .then(({ removed }) => {
        toast.info(removed ? "💔 Favorilerden çıkarıldı!" : "❤️ Favorilere eklendi!");
      })
      .catch(() => toast.error("🚨 Favori işlemi başarısız!"));
  };

  const isFavorited = (productId) => favorites.includes(productId);

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
          {filteredProducts.map((product) => {
            const stockMessage = product.stock > 0 ? "✅ Stokta Var" : "⚠️ Stok Yok";
            const imageSrc = product.images?.[0]?.startsWith("/uploads/products/")
              ? `${BASE_URL}${product.images[0]}`
              : product.images?.[0] || "/placeholder.jpg";

            return (
              <ProductCard
                key={product._id}
                theme={theme}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                {product.isNew && (
                  <ProductLabel theme={theme}>🔥 {texts?.home?.newProduct || "Yeni"}</ProductLabel>
                )}
                <ProductImage src={imageSrc} alt={product.title} />
                <ProductTitle theme={theme}>{product.title}</ProductTitle>
                <ProductPrice theme={theme}>${product.price.toFixed(2)}</ProductPrice>
                <StockStatus theme={theme}>{stockMessage}</StockStatus>

                <AddToCartButton
                  theme={theme}
                  onClick={(e) => handleAddToCart(product, e)}
                  disabled={product.stock === 0}
                >
                  {texts?.product?.addToCart || "Sepete Ekle"}
                </AddToCartButton>

                <BuyNowButton theme={theme} onClick={(e) => handleBuyNow(product, e)}>
                  {texts?.product?.buyNow || "Hemen Al"}
                </BuyNowButton>

                <FavoriteIcon
                  theme={theme}
                  onClick={(e) => handleToggleFavorite(product, e)}
                  $favorited={isFavorited(product._id) ? "true" : undefined}
                >
                  {isFavorited(product._id) ? "❤️" : "🤍"}
                </FavoriteIcon>

                <StockStatus theme={theme}>{stockMessage}</StockStatus>
              </ProductCard>
            );
          })}
        </motion.div>
      </CarouselWrapper>
    </CarouselContainer>
  );
};

export default ProductCarousel;
