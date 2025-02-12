import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { toast } from "react-toastify"; // Bildirim için
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
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/data");
        setProducts(response.data);
      } catch (error) {
        console.error("Ürün verileri alınamadı:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.title} sepete eklendi!`, {
      position: "top-right",
      autoClose: 2000,
    });
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
      <h2>Ürünler</h2>
      <CarouselWrapper>
        {filteredProducts.slice(0, 6).map((product) => (
          <ProductCard key={product.id}>
            {product.isNew && <ProductLabel>Yeni</ProductLabel>}
            <ProductImage src={product.images[0]} alt={product.title} />

            <ProductTitle>{product.title}</ProductTitle>

            <ProductPrice>${product.price}</ProductPrice>

            {product.stock > 0 ? (
              <StockStatus>Stokta Var</StockStatus>
            ) : (
              <StockStatus style={{ color: "red" }}>Stokta Yok</StockStatus>
            )}

            <AddToCartButton
              onClick={() => handleAddToCart(product)}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Stokta Yok" : "Sepete Ekle"}
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
