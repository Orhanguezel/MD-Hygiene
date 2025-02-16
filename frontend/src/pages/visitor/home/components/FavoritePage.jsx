import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "@/features/favorites/favoriteSlice";
import {
  FavoritesContainer,
  FavoriteCard,
  FavoriteImage,
  FavoriteTitle,
  FavoritePrice,
  RemoveButton,
} from "../styles/FavoriteStyles";

const FavoritePage = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorite);
  const { products } = useSelector((state) => state.product);

  // 📌 Favorilere eklenen ürünleri filtrele
  const favoriteProducts = products.filter((product) => favorites.includes(product.id));

  return (
    <FavoritesContainer>
      <h2>❤️ Favori Ürünler</h2>
      {favoriteProducts.length > 0 ? (
        favoriteProducts.map((product) => (
          <FavoriteCard key={product.id}>
            <FavoriteImage src={product.images[0]} alt={product.title} />
            <FavoriteTitle>{product.title}</FavoriteTitle>
            <FavoritePrice>${product.price}</FavoritePrice>
            <RemoveButton onClick={() => dispatch(toggleFavorite(product.id))}>
              ❌ Kaldır
            </RemoveButton>
          </FavoriteCard>
        ))
      ) : (
        <p>⚠️ Henüz favori ürün eklenmedi!</p>
      )}
    </FavoritesContainer>
  );
};

export default FavoritePage;
