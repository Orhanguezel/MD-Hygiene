import { useNavigate } from "react-router-dom"; // ✅ Sayfa yönlendirme
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { toast } from "react-toastify"; // ✅ Bildirimler için import edildi
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
  const navigate = useNavigate(); // ✅ Navigasyon

  const handleAddToCart = () => {
    if (!product || typeof addToCart !== "function") {
      toast.error("❌ Sepete ekleme işlemi başarısız!");
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

  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (typeof addToCart !== "function") {
      toast.error("❌ Sepete ekleme işlemi başarısız!");
      return;
    }

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

  const handleProductClick = () => {
    navigate(`/product/${product.id}`); // ✅ Ürün detayına yönlendir
  };

  return (
    <ProductCardContainer onClick={handleProductClick}>
      <ProductImage src={product?.images?.[0] || "/placeholder.jpg"} alt={product.title} />
      <ProductTitle>{product.title}</ProductTitle>
      <ProductPrice>${product.price}</ProductPrice>
      <AddToCartButton
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCart();
        }}
      >
        {texts?.product?.addToCart || "Sepete Ekle"}
      </AddToCartButton>

      <BuyNowButton onClick={handleBuyNow}>
        {texts?.product?.buyNow || "Hemen Al"}
      </BuyNowButton>
    </ProductCardContainer>
  );
};

export default ProductCard;
