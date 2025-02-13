import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import {
  CarouselContainer,
  ProductCard,
  ProductImage,
  ProductTitle,
  ProductPrice,
  AddToCartButton,
  FavoriteIcon,
  StockStatus,
  ProductLabel,
  CarouselWrapper,
} from "../styles/ProductCarouselStyles";

const ProductCarousel = ({ selectedCategory }) => {
  const { texts } = useLanguage();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/data");
        setProducts(response.data);
      } catch (error) {
        console.error(texts.home.loading, error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.title} ${texts.home.buyNow}`, { position: "top-right", autoClose: 2000 });
  };

  const handleToggleFavorite = (productId) => {
    const updatedFavorites = favorites.includes(productId)
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category.id === selectedCategory)
    : products;

  return (
    <CarouselContainer>
      <h2>{texts.home.featuredProducts}</h2>
      <CarouselWrapper>
        {filteredProducts.slice(0, 6).map((product) => (
          <ProductCard key={product.id}>
            {product.isNew && <ProductLabel>🔥 {texts.home.featuredProducts}</ProductLabel>}
            <ProductImage src={product.images[0]} alt={product.title} />
            <ProductTitle>{product.title}</ProductTitle>
            <ProductPrice>${product.price}</ProductPrice>

            {product.stock > 0 ? (
              <StockStatus>✅ {texts.product.inStock || "Stokta Var"}</StockStatus>
            ) : (
              <StockStatus style={{ color: "red" }}>❌ {texts.product.outOfStock || "Stokta Yok"}</StockStatus>
            )}

            <AddToCartButton
              onClick={() => handleAddToCart(product)}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? texts.product.outOfStock : texts.home.buyNow}
            </AddToCartButton>

            <FavoriteIcon
              onClick={() => handleToggleFavorite(product.id)}
              favorited={favorites.includes(product.id)}
            >
              {favorites.includes(product.id) ? "❤️" : "🤍"}
            </FavoriteIcon>
          </ProductCard>
        ))}
      </CarouselWrapper>
    </CarouselContainer>
  );
};

export default ProductCarousel;
