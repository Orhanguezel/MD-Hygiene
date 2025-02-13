import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { useLanguage } from "@/features/language/useLanguage"; // ✅ Dil Desteği

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { texts } = useLanguage();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <img src={product.images[0]} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>{texts.product.addToCart}</button>
    </div>
  );
};

export default ProductCard;
