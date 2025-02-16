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
  ButtonContainer, // ✅ Ekstra div için stil eklendi
} from "./styles/CartStyles";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { texts } = useLanguage();

  // 📌 **Redux Store'dan Sepet Verileri**
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const totalPrice = useSelector((state) => state.cart.totalPrice) || 0;

  // 📌 **Vergi ve Kargo Ücretleri**
  const VAT_RATE = 0.19;
  const SHIPPING_COST = 20;
  const vatAmount = totalPrice * VAT_RATE;
  const grandTotal = totalPrice + vatAmount + SHIPPING_COST;

  // 📌 **Sayfa Açıldığında Sepet Verisini Redux Store'a Yükle**
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <CartContainer>
      <Title>{texts.cart.title}</Title>
      {cartItems.length === 0 ? (
        <EmptyCartMessage>{texts.cart.empty}</EmptyCartMessage>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <CartItem key={item.id}>
              <ProductImage
                src={item.images?.[0] || "/placeholder.jpg"}
                alt={item.title || "Ürün resmi"}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />
              <ProductDetails>
                <h3>{index + 1}. {item.title}</h3>
                <p>{texts.cart.unitPrice}: ${item.price}</p>
                <QuantityControls>
                  <StyledButton
                    onClick={() => {
                      if (item.quantity > 1) {
                        dispatch(decreaseQuantity(item.productId));
                        toast.info("➖ Ürün miktarı azaltıldı!");
                      } else {
                        dispatch(removeFromCart(item.productId));
                        toast.warn("🗑️ Ürün sepetten kaldırıldı!");
                      }
                    }}
                  >
                    -
                  </StyledButton>
                  <span>{texts.cart.quantity}: {item.quantity}</span>
                  <StyledButton
                    onClick={() => {
                      dispatch(increaseQuantity(item.productId));
                      toast.success("➕ Ürün miktarı artırıldı!");
                    }}
                  >
                    +
                  </StyledButton>
                </QuantityControls>
                <p>{texts.cart.itemTotal}: ${(item.price * item.quantity).toFixed(2)}</p>
                <StyledButton
                  onClick={() => {
                    dispatch(removeFromCart(item.productId));
                    toast.warn("🗑️ Ürün sepetten kaldırıldı!");
                  }}
                >
                  {texts.cart.remove}
                </StyledButton>
              </ProductDetails>
            </CartItem>
          ))}

          <Summary>
            <Invoice>{texts.cart.invoiceDetails}</Invoice>
            <InvoiceDetails>
              {cartItems.map((item, index) => (
                <SummaryItem key={item.id}>
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
              <span>${SHIPPING_COST.toFixed(2)}</span>
            </SummaryItem>
            <SummaryItem className="grand-total">
              <strong>{texts.cart.grandTotal}:</strong>
              <span>${grandTotal.toFixed(2)}</span>
            </SummaryItem>

            {/* ✅ Tüm butonları kapsayan div'e stil verdik */}
            <ButtonContainer>
              <StyledButton onClick={() => dispatch(clearCart())}>
                🗑️ {texts.cart.clearCart}
              </StyledButton>
              <StyledButton $primary={true} onClick={() => navigate("/checkout")}>
                ✅ {texts.cart.checkout}
              </StyledButton>
            </ButtonContainer>
          </Summary>
        </>
      )}
    </CartContainer>
  );
};

export default Cart;
