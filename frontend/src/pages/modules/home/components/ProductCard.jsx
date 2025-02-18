import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ProductCardContainer,
  ProductImage,
  ProductTitle,
  ProductPrice,
  AddToCartButton,
  BuyNowButton,
} from "../styles/ProductCardStyles";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { texts } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!product || !product.id) {
      toast.error(texts.product.toastMessages.addToCartError);
      return;
    }

    dispatch(addToCart(product))
      .unwrap()
      .then(() => {
        toast.success(texts.product.toastMessages.addToCartSuccess);
      })
      .catch(() => {
        toast.error(texts.product.toastMessages.addToCartError);
      });
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();

    if (!product || !product.id) {
      toast.error(texts.product.toastMessages.addToCartError);
      return;
    }

    dispatch(addToCart(product))
      .unwrap()
      .then(() => {
        toast.success(texts.product.toastMessages.buyNowSuccess);
        navigate("/checkout");
      })
      .catch(() => {
        toast.error(texts.product.toastMessages.addToCartError);
      });
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <ProductCardContainer theme={theme} onClick={handleProductClick}>
      <ProductImage src={product?.images?.[0] || "/placeholder.jpg"} alt={product.title} />
      <ProductTitle theme={theme}>{product.title}</ProductTitle>
      <ProductPrice theme={theme}>${product.price}</ProductPrice>

      <AddToCartButton
        theme={theme}
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCart();
        }}
      >
        {texts.product.addToCart}
      </AddToCartButton>

      <BuyNowButton theme={theme} onClick={handleBuyNow}>
        {texts.product.buyNow}
      </BuyNowButton>
    </ProductCardContainer>
  );
};

export default ProductCard;
