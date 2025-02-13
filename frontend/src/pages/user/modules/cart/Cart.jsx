import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "@/features/cart/cartSlice";
import { useLanguage } from "@/features/language/useLanguage"; // ✅ Dil Desteği
import { useTheme } from "@/features/theme/useTheme"; // ✅ Tema Desteği
import {
  CartContainer,
  CartItem,
  ProductImage,
  ProductDetails,
  QuantityControls,
  Summary,
  SummaryItem,
  Button,
  Title,
  EmptyCartMessage,
  InvoiceDetails,
  Invoice,
  ListItems,
} from "./styles/CartStyles";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { texts } = useLanguage();  // ✅ Dil desteği
  const { theme } = useTheme();  // ✅ Tema desteği

  const VAT_RATE = 0.19;
  const SHIPPING_COST = 20;

  const vatAmount = totalPrice * VAT_RATE;
  const grandTotal = totalPrice + vatAmount + SHIPPING_COST;

  return (
    <CartContainer theme={theme}>
      <Title>{texts.cart.title}</Title>
      {cartItems.length === 0 ? (
        <EmptyCartMessage>{texts.cart.empty}</EmptyCartMessage>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <CartItem key={item.id} theme={theme}>
              <ProductImage src={item.images[0]} alt={item.title} />
              <ProductDetails>
                <h3>
                  {index + 1}. {item.title}
                </h3>
                <p>{texts.cart.unitPrice}: ${item.price}</p>
                <QuantityControls>
                  <Button onClick={() => dispatch(decreaseQuantity(item.id))}>-</Button>
                  <span>{texts.cart.quantity}: {item.quantity}</span>
                  <Button onClick={() => dispatch(increaseQuantity(item.id))}>+</Button>
                </QuantityControls>
                <p>{texts.cart.itemTotal}: ${(item.price * item.quantity).toFixed(2)}</p>
                <Button onClick={() => dispatch(removeFromCart(item.id))}>
                  ❌ {texts.cart.remove}
                </Button>
              </ProductDetails>
            </CartItem>
          ))}

          <Summary>
            <Invoice>{texts.cart.invoiceDetails}</Invoice>
            <InvoiceDetails>
              {cartItems.map((item, index) => (
                <SummaryItem key={item.id}>
                  <ListItems>
                    {index + 1}. {item.title} (x{item.quantity})
                  </ListItems>
                  <ListItems>
                    ${(item.price * item.quantity).toFixed(2)}
                  </ListItems>
                </SummaryItem>
              ))}
            </InvoiceDetails>

            <SummaryItem><strong>{texts.cart.totalPrice}:</strong> ${totalPrice.toFixed(2)}</SummaryItem>
            <SummaryItem><strong>{texts.cart.vat} (19%):</strong> ${vatAmount.toFixed(2)}</SummaryItem>
            <SummaryItem><strong>{texts.cart.shippingCost}:</strong> ${SHIPPING_COST.toFixed(2)}</SummaryItem>
            <SummaryItem style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              {texts.cart.grandTotal}: ${grandTotal.toFixed(2)}
            </SummaryItem>

            <Button onClick={() => dispatch(clearCart())}>🗑️ {texts.cart.clearCart}</Button>
            <Button primary onClick={() => navigate("/checkout")}>
              {texts.cart.checkout} ✅
            </Button>
          </Summary>
        </>
      )}
    </CartContainer>
  );
};

export default Cart;
