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
  const { products } = useSelector((state) => state.product);
  const { favorites } = useSelector((state) => state.favorite);
  const { cartItems } = useSelector((state) => state.cart);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const product = products.find((p) => String(p.id) === String(id));

  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  if (!product) {
    return <p>🔍 {texts.product?.notFound || "Ürün bulunamadı."}</p>;
  }

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

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product.id));
    toast.info(
      favorites.includes(product.id)
        ? texts.product.toastMessages?.removedFromFavorites || "💔 Ürün favorilerden çıkarıldı!"
        : texts.product.toastMessages?.addedToFavorites || "❤️ Ürün favorilere eklendi!"
    );
  };

  const isInCart = cartItems.some((item) => item.id === product.id);

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
        <ProductPrice theme={theme}>${product.price}</ProductPrice>
        <StockStatus theme={theme}>
          {product.stock > 0 ? texts.product?.inStock || "✅ Stokta Var" : texts.product?.outOfStock || "⚠️ Stok Durumu Belirsiz"}
        </StockStatus>
        <ProductDescription theme={theme}>{product.description}</ProductDescription>

        <AddToCartButton onClick={handleAddToCart} disabled={isInCart} theme={theme}>
          {isInCart ? texts.product?.inCart || "🛒 Sepette Mevcut" : texts.product?.addToCart || "➕ Sepete Ekle"}
        </AddToCartButton>

        <FavoriteButton $favorited={favorites.includes(product.id) ? "true" : "false"} onClick={handleToggleFavorite} theme={theme}>
          {favorites.includes(product.id)
            ? "" + (texts.product?.inFavorites || "Favorilerde")
            : "🤍 " + (texts.product?.addToFavorites || "Favorilere Ekle")}
        </FavoriteButton>
      </ProductInfo>
    </ProductDetailContainer>
  );
};

export default ProductDetail;
