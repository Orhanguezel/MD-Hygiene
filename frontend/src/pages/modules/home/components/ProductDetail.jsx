import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/features/products/productSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { toggleFavorite } from "@/features/favorites/favoriteSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import {
  ProductDetailContainer,
  ProductImage,
  ProductInfo,
  ProductTitle,
  ProductPrice,
  StockStatus,
  AddToCartButton,
  FavoriteButton,
  ProductDescription,
  ImageCarousel,
  SmallImage,
  BackButton
} from "../styles/ProductDetailStyles";

const ProductDetail = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { texts } = useLanguage();
  const { theme } = useTheme();

  // ✅ Redux Store'dan verileri al
  const { products, loading } = useSelector((state) => state.product);
  const { favorites = [] } = useSelector((state) => state.favorite); // ✅ Default boş dizi tanımlandı
  const { cartItems } = useSelector((state) => state.cart);

  const [selectedImage, setSelectedImage] = useState(null);

  // 📌 **Ürünleri yükle, eğer daha önce yüklenmemişse**
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // 📌 **Seçili ürünü bul**
  const product = products.find((p) => p._id === id);

  // 📌 **Ürün resmi ilk defa yüklendiğinde güncelle**
  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  // ⏳ **Eğer veri yükleniyorsa bekleme mesajı göster**
  if (loading) {
    return <p>⏳ {texts.product?.loading || "Ürün bilgileri yükleniyor..."}</p>;
  }

  // 🚨 **Eğer ürün bulunamadıysa hata mesajı göster**
  if (!product) {
    return <p>🔍 {texts.product?.notFound || "Ürün bulunamadı."}</p>;
  }

  // 📌 **Sepete ekleme işlemi**
  const handleAddToCart = () => {
    dispatch(addToCart(product))
      .unwrap()
      .then(() => {
        toast.success(texts.product.toastMessages?.addToCartSuccess || "✅ Ürün sepete eklendi!");
      })
      .catch(() => {
        toast.error(texts.product.toastMessages?.addToCartError || "❌ Ürün sepete eklenemedi!");
      });
  };

  // 📌 **Favori ekleme/çıkarma işlemi RTK üzerinden yapılacak**
  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product))
      .unwrap()
      .then(({ removed }) => {
        toast.info(
          removed
            ? texts.product.toastMessages?.removedFromFavorites || "💔 Ürün favorilerden çıkarıldı!"
            : texts.product.toastMessages?.addedToFavorites || "❤️ Ürün favorilere eklendi!"
        );
      })
      .catch(() => {
        toast.error("🚨 Favori işlemi başarısız!");
      });
  };

  // **Favoride olup olmadığını Redux Store'dan kontrol et (GÜVENLİ HALE GETİRİLDİ)**
  const isFavorited = Array.isArray(favorites) ? favorites.includes(product._id) : false;

  return (
    <ProductDetailContainer theme={theme}>
      <BackButton onClick={() => navigate(-1)} theme={theme}>
        {texts.product?.goBack || "Geri Dön"}
      </BackButton>

      <ImageCarousel>
        <ProductImage src={selectedImage || "/placeholder.jpg"} alt={product.title} />
        <div>
          {product.images?.map((img, index) => (
            <SmallImage key={index} src={img} alt={`Thumbnail ${index}`} onClick={() => setSelectedImage(img)} />
          ))}
        </div>
      </ImageCarousel>

      <ProductInfo>
        <ProductTitle theme={theme}>{product.title}</ProductTitle>
        <ProductPrice theme={theme}>${product.price.toFixed(2)}</ProductPrice>
        <StockStatus theme={theme}>
          {product.stock > 0 ? texts.product?.inStock || "✅ Stokta Var" : texts.product?.outOfStock || "⚠️ Stok Durumu Belirsiz"}
        </StockStatus>
        <ProductDescription theme={theme}>{product.description}</ProductDescription>

        <AddToCartButton onClick={handleAddToCart} disabled={cartItems.some((item) => item._id === product._id)} theme={theme}>
          {cartItems.some((item) => item._id === product._id)
            ? texts.product?.inCart || "🛒 Sepette Mevcut"
            : texts.product?.addToCart || "➕ Sepete Ekle"}
        </AddToCartButton>

        <FavoriteButton
          $favorited={isFavorited ? "true" : "false"}
          onClick={handleToggleFavorite}
          theme={theme}
        >
          {isFavorited
            ? texts.product?.inFavorites || "💖 Favorilerde"
            : "🤍 " + (texts.product?.addToFavorites || "Favorilere Ekle")}
        </FavoriteButton>
      </ProductInfo>
    </ProductDetailContainer>
  );
};

export default ProductDetail;
