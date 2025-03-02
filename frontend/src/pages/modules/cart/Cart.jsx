import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  addToCart,
} from "@/features/cart/cartSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CartContainer,
  CartItem,
  ProductImage,
  ProductDetails,
  QuantityControls,
  Summary,
  SummaryItem,
  StyledButton,
  Title,
  EmptyCartMessage,
  InvoiceDetails,
  Invoice,
  ListItems,
  ButtonContainer,
} from "./styles/CartStyles";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { texts } = useLanguage();

  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const totalPrice = useSelector((state) => state.cart.totalPrice) || 0;
  const vatAmount = useSelector((state) => state.cart.vatAmount) || 0;
  const shippingCost = useSelector((state) => state.cart.shippingCost) || 0;
  const grandTotal = useSelector((state) => state.cart.grandTotal) || 0;

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // ✅ **Ürün Miktarını Artırma**
  const handleIncrease = async (productId) => {
    try {
      await dispatch(increaseQuantity(productId)).unwrap();
      await dispatch(fetchCart()).unwrap();
      toast.success(texts.cart.toast?.increaseSuccess || "✅ Ürün miktarı artırıldı!");
    } catch {
      toast.error(texts.cart.toast?.error || "❌ Hata oluştu!");
    }
  };

  // ✅ **Ürün Miktarını Azaltma**
  const handleDecrease = async (productId, quantity) => {
    try {
      await dispatch(decreaseQuantity(productId)).unwrap();
      await dispatch(fetchCart()).unwrap();

      if (quantity > 1) {
        toast.info(texts.cart.toast?.decreaseSuccess || "➖ Ürün miktarı azaltıldı!");
      } else {
        toast.warn(texts.cart.toast?.removeSuccess || "🗑️ Ürün sepetten kaldırıldı!");
      }
    } catch {
      toast.error(texts.cart.toast?.error || "❌ Hata oluştu!");
    }
  };

  // ✅ **Ürünü Sepetten Kaldırma**
  const handleRemove = async (productId) => {
    try {
      await dispatch(removeFromCart(productId)).unwrap();
      await dispatch(fetchCart()).unwrap();
      toast.warn(texts.cart.toast?.removeSuccess || "🗑️ Ürün sepetten kaldırıldı!");
    } catch {
      toast.error(texts.cart.toast?.error || "❌ Ürün kaldırılırken hata oluştu!");
    }
  };

  return (
    <CartContainer>
      <Title>{texts.cart.title}</Title>
      {cartItems.length === 0 ? (
        <EmptyCartMessage>{texts.cart.empty}</EmptyCartMessage>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <CartItem key={item.product._id}>
              <ProductImage
                src={item.images?.[0] || "/placeholder.jpg"}
                alt={item.title || "Ürün resmi"}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />
              <ProductDetails>
                <h3>{index + 1}. {item.title}</h3>
                <p>{texts.cart.unitPrice}: ${item.price}</p>
                <QuantityControls>
                  <StyledButton onClick={() => handleDecrease(item.product._id, item.quantity)}>
                    -
                  </StyledButton>
                  <span>{texts.cart.quantity}: {item.quantity}</span>
                  <StyledButton onClick={() => handleIncrease(item.product._id)}>
                    +
                  </StyledButton>
                </QuantityControls>
                <p>{texts.cart.itemTotal}: ${(item.price * item.quantity).toFixed(2)}</p>
                {/* 🔥 Güncellenmiş buton */}
                <StyledButton onClick={() => handleRemove(item.product._id)}>
                  {texts.cart.remove}
                </StyledButton>
              </ProductDetails>
            </CartItem>
          ))}

          <Summary>
            <Invoice>{texts.cart.invoiceDetails}</Invoice>
            <InvoiceDetails>
              {cartItems.map((item, index) => (
                <SummaryItem key={item.product._id}>
                  <ListItems>{index + 1}. {item.title} (x{item.quantity})</ListItems>
                  <ListItems>${(item.price * item.quantity).toFixed(2)}</ListItems>
                </SummaryItem>
              ))}
            </InvoiceDetails>

            <SummaryItem>
              <strong>{texts.cart.totalPrice}:</strong>
              <span>${totalPrice.toFixed(2)}</span>
            </SummaryItem>
            <SummaryItem>
              <strong>{texts.cart.vat} (19%):</strong>
              <span>${vatAmount.toFixed(2)}</span>
            </SummaryItem>
            <SummaryItem>
              <strong>{texts.cart.shippingCost}:</strong>
              <span>${shippingCost.toFixed(2)}</span>
            </SummaryItem>
            <SummaryItem className="grand-total">
              <strong>{texts.cart.grandTotal}:</strong>
              <span>${grandTotal.toFixed(2)}</span>
            </SummaryItem>

            <ButtonContainer>
              <StyledButton onClick={() => {
                dispatch(clearCart()).then(() => {
                  dispatch(fetchCart());
                  toast.warn(texts.cart.toast?.clearCart || "🗑️ Sepet temizlendi!");
                });
              }}>
                 {texts.cart.clearCart}
              </StyledButton>
              <StyledButton $primary={true} onClick={() => navigate("/checkout")}> 
                 {texts.cart.checkout}
              </StyledButton>
            </ButtonContainer>
          </Summary>
        </>
      )}
    </CartContainer>
  );
};

export default Cart;
