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
    toast.success(texts.cart.increaseSuccess);
  };

  const handleDecrease = (productId) => {
    dispatch(decreaseQuantity(productId)).then(() => dispatch(fetchCart()));
    toast.info(texts.cart.decreaseSuccess);
  };
  

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
                  <StyledButton onClick={() => handleDecrease(item.productId, item.quantity)}>
                    -
                  </StyledButton>
                  <span>{texts.cart.quantity}: {item.quantity}</span>
                  <StyledButton onClick={() => handleIncrease(item.productId)}>
                    +
                  </StyledButton>
                </QuantityControls>
                <p>{texts.cart.itemTotal}: ${(item.price * item.quantity).toFixed(2)}</p>
                <StyledButton onClick={() => handleDecrease(item.productId, 1)}>
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
              <span>${shippingCost.toFixed(2)}</span>
            </SummaryItem>
            <SummaryItem className="grand-total">
              <strong>{texts.cart.grandTotal}:</strong>
              <span>${grandTotal.toFixed(2)}</span>
            </SummaryItem>

            <ButtonContainer>
              <StyledButton onClick={() => dispatch(clearCart()).then(() => dispatch(fetchCart()))}>
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
