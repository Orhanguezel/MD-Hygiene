import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
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

  // 📌 **Redux Store'dan Sepet Verileri**
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const vatAmount = useSelector((state) => state.cart.vatAmount);
  const shippingCost = useSelector((state) => state.cart.shippingCost);
  const grandTotal = useSelector((state) => state.cart.grandTotal);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrease = (productId) => {
    dispatch(increaseQuantity(productId)).then(() => dispatch(fetchCart()));
    toast.success(texts.cart.increaseSuccess || "✅ Ürün miktarı artırıldı.");
  };

  const handleDecrease = (productId, quantity) => {
    if (quantity > 1) {
      dispatch(decreaseQuantity(productId)).then(() => dispatch(fetchCart()));
      toast.info(texts.cart.decreaseSuccess || "ℹ️ Ürün miktarı azaltıldı.");
    } else {
      dispatch(removeFromCart(productId)).then(() => {
        dispatch(fetchCart());
        toast.warn(texts.cart.removeSuccess || "⚠️ Ürün sepetten kaldırıldı.");
      });
    }
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId)).then(() => {
      dispatch(fetchCart());
      toast.error(texts.cart.removeSuccess || "❌ Ürün sepetten kaldırıldı.");
    });
  };

  return (
    <CartContainer>
      <Title>{texts.cart.title || "Sepetiniz"}</Title>
      {cartItems.length === 0 ? (
        <EmptyCartMessage>{texts.cart.empty || "Sepetiniz boş."}</EmptyCartMessage>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <CartItem key={item.productId}> {/* ✅ Redux güncellemelerinde sorun çıkmaması için key değiştirildi */}
              <ProductImage
                src={item.images?.[0] || "/placeholder.jpg"}
                alt={item.title || "Ürün resmi"}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />
              <ProductDetails>
                <h3>{index + 1}. {item.title}</h3>
                <p>{texts.cart.unitPrice || "Birim Fiyat"}: ${item.price}</p>
                <QuantityControls>
                  <StyledButton onClick={() => handleDecrease(item.productId, item.quantity)}>
                    -
                  </StyledButton>
                  <span>{texts.cart.quantity || "Adet"}: {item.quantity}</span>
                  <StyledButton onClick={() => handleIncrease(item.productId)}>
                    +
                  </StyledButton>
                </QuantityControls>
                <p>{texts.cart.itemTotal || "Toplam"}: ${(item.price * item.quantity).toFixed(2)}</p>
                <StyledButton onClick={() => handleRemove(item.productId)}>
                  {texts.cart.remove || "Kaldır"}
                </StyledButton>
              </ProductDetails>
            </CartItem>
          ))}

          <Summary>
            <Invoice>{texts.cart.invoiceDetails || "Fatura Detayları"}</Invoice>
            <InvoiceDetails>
              {cartItems.map((item, index) => (
                <SummaryItem key={item.productId}>
                  <ListItems>{index + 1}. {item.title} (x{item.quantity})</ListItems>
                  <ListItems>${(item.price * item.quantity).toFixed(2)}</ListItems>
                </SummaryItem>
              ))}
            </InvoiceDetails>

            <SummaryItem>
              <strong>{texts.cart.totalPrice || "Ara Toplam"}:</strong>
              <span>${totalPrice.toFixed(2)}</span>
            </SummaryItem>
            <SummaryItem>
              <strong>{texts.cart.vat || "KDV"} (19%):</strong>
              <span>${vatAmount.toFixed(2)}</span>
            </SummaryItem>
            <SummaryItem>
              <strong>{texts.cart.shippingCost || "Kargo Ücreti"}:</strong>
              <span>${shippingCost.toFixed(2)}</span>
            </SummaryItem>
            <SummaryItem className="grand-total">
              <strong>{texts.cart.grandTotal || "Genel Toplam"}:</strong>
              <span>${grandTotal.toFixed(2)}</span>
            </SummaryItem>

            <ButtonContainer>
              <StyledButton onClick={() => dispatch(clearCart()).then(() => dispatch(fetchCart()))}>
                {texts.cart.clearCart || "Sepeti Temizle"}
              </StyledButton>
              <StyledButton $primary={true} onClick={() => navigate("/checkout")}>
                {texts.cart.checkout || "Ödeme Yap"}
              </StyledButton>
            </ButtonContainer>
          </Summary>
        </>
      )}
    </CartContainer>
  );
};

export default Cart;
