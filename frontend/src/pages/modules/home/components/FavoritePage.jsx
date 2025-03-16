import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite, fetchFavorites } from "@/features/favorites/favoriteSlice";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/features/theme/useTheme";
import { toast } from "react-toastify";
import {
  FavoritesContainer,
  FavoriteCard,
  FavoriteImage,
  FavoriteTitle,
  FavoritePrice,
  RemoveButton,
  EmptyMessage,
} from "../styles/FavoriteStyles";

const BASE_URL = "http://localhost:5010";

const FavoritePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const favorites = useSelector((state) => state.favorite.favorites);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  // 📌 Favorilere eklenen ürünleri filtrele
  const favoriteProducts = products.filter((product) =>
    favorites.includes(product._id)
  );

  const handleRemoveFavorite = (product, e) => {
    e.stopPropagation();

    dispatch(toggleFavorite(product))
      .unwrap()
      .then(() => {
        toast.info(`${product.title} favorilerden çıkarıldı!`);
      })
      .catch(() => toast.error("🚨 Favori silinirken hata oluştu!"));
  };

  return (
    <FavoritesContainer>
      <h2>❤️ Favori Ürünler</h2>

      {favoriteProducts.length > 0 ? (
        favoriteProducts.map((product) => (
          <FavoriteCard
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <FavoriteImage
              src={
                product.images[0].startsWith("/uploads/products/")
                  ? `${BASE_URL}${product.images[0]}`
                  : product.images[0] || "/placeholder.jpg"
              }
              alt={product.title}
            />
            <FavoriteTitle>{product.title}</FavoriteTitle>
            <FavoritePrice>${product.price.toFixed(2)}</FavoritePrice>

            <RemoveButton onClick={(e) => handleRemoveFavorite(product, e)}>
              ❌ Kaldır
            </RemoveButton>
          </FavoriteCard>
        ))
      ) : (
        <EmptyMessage>
          ⚠️ Henüz favori ürün eklenmedi!
        </EmptyMessage>
      )}
    </FavoritesContainer>
  );
};

export default FavoritePage;
