import { useEffect, useState } from "react";
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

  // ✅ Redux Store'dan favoriler ve ürünler alınıyor
  const { favorites } = useSelector((state) => state.favorite);
  const { filteredProducts } = useSelector((state) => state.product);
  const cart = useSelector((state) => state.cart);

  const [offset, setOffset] = useState(0);

  // ✅ Favori ürünleri Redux'tan çek
  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  // ✅ Carousel otomatik kaydırma (Filtrelenen ürünler geldikten sonra başlar)
  useEffect(() => {
    if (filteredProducts?.length > 0) {
      const interval = setInterval(() => {
        setOffset((prev) => (prev - 220) % (filteredProducts.length * 220));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [filteredProducts]);

  // 🛒 **Sepete Ekle Butonu**
  const handleAddToCart = (product, event) => {
    event.stopPropagation();

    if (!product || !product.id) {
      toast.error("❌ Sepete eklenmeye çalışılan ürün geçersiz!");
      return;
    }

    dispatch(addToCart(product))
      .unwrap()
      .then(() => {
        toast.success("✅ Ürün sepete eklendi!");
      })
      .catch(() => {
        toast.error("❌ Ürün sepete eklenemedi!");
      });
  };

  // 🛒 **Şimdi Satın Al Butonu**
  const handleBuyNow = (product, event) => {
    event.stopPropagation();

    dispatch(addToCart(product))
      .unwrap()
      .then(() => {
        toast.success("✅ Ürün sepete eklendi! Ödeme sayfasına yönlendiriliyorsunuz...");
        navigate("/checkout");
      })
      .catch(() => {
        toast.error("❌ Ürün sepete eklenemedi!");
      });
  };

  return (
    <CarouselContainer theme={theme}>
      <h2>{texts?.home?.featuredProducts || "Öne Çıkan Ürünler"}</h2>
      <CarouselWrapper>
        <motion.div
          animate={{ x: offset }}
          transition={{ ease: "linear", duration: 1 }}
          style={{ display: "flex", gap: "15px", minWidth: "100%" }}
        >
          {filteredProducts?.map((product, index) => {
            const stockMessage = product.stock > 0 ? "✅ Stokta Var" : "⚠️ Stok Durumu Belirsiz";

            return (
              <ProductCard key={index} theme={theme} onClick={() => navigate(`/product/${product.id}`)}>
                {product.isNew && <ProductLabel theme={theme}>🔥 {texts?.home?.newProduct || "Yeni"}</ProductLabel>}
                <ProductImage src={product.images?.[0] || "/placeholder.jpg"} alt={product.title} />
                <ProductTitle theme={theme}>{product.title}</ProductTitle>
                <ProductPrice theme={theme}>${product.price}</ProductPrice>
                <StockStatus theme={theme}>{stockMessage}</StockStatus>

                {/* ✅ **Sepete Ekle Butonu** */}
                <AddToCartButton theme={theme} onClick={(e) => handleAddToCart(product, e)} disabled={product.stock === 0}>
                  {texts?.product?.addToCart || "Sepete Ekle"}
                </AddToCartButton>

                {/* ✅ **Şimdi Satın Al Butonu** */}
                <BuyNowButton theme={theme} onClick={(e) => handleBuyNow(product, e)}>
                  {texts?.product?.buyNow || "Hemen Al"}
                </BuyNowButton>

                {/* ✅ **Favori Butonu** */}
                <FavoriteIcon
                  theme={theme}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleFavorite(product.id));
                    toast.info(
                      favorites.includes(product.id)
                        ? "💔 Ürün favorilerden çıkarıldı!"
                        : "❤️ Ürün favorilere eklendi!"
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
