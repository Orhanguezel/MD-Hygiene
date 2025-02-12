import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "@/features/cart/cartSlice";
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

  const VAT_RATE = 0.18;
  const SHIPPING_COST = 20;

  const vatAmount = totalPrice * VAT_RATE;
  const grandTotal = totalPrice + vatAmount + SHIPPING_COST;

  const navigate = useNavigate();

  return (
    <CartContainer>
      <Title>🛒 Sepetim</Title>
      {cartItems.length === 0 ? (
        <EmptyCartMessage>Sepetiniz boş.</EmptyCartMessage>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <CartItem key={item.id}>
              <ProductImage src={item.images[0]} alt={item.title} />
              <ProductDetails>
                <h3>
                  {index + 1}. {item.title}
                </h3>
                <p>Birim Fiyat: ${item.price}</p>
                <QuantityControls>
                  <Button onClick={() => dispatch(decreaseQuantity(item.id))}>
                    -
                  </Button>
                  <span>Miktar: {item.quantity}</span>
                  <Button onClick={() => dispatch(increaseQuantity(item.id))}>
                    +
                  </Button>
                </QuantityControls>
                <p>Ürün Toplam: ${(item.price * item.quantity).toFixed(2)}</p>
                <Button onClick={() => dispatch(removeFromCart(item.id))}>
                  ❌ Sil
                </Button>
              </ProductDetails>
            </CartItem>
          ))}

          <Summary>
            <Invoice>📄 Fatura Detayları</Invoice>
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

            <SummaryItem>
              <strong>Toplam Fiyat:</strong> ${totalPrice.toFixed(2)}
            </SummaryItem>
            <SummaryItem>
              <strong>KDV (%18):</strong> ${vatAmount.toFixed(2)}
            </SummaryItem>
            <SummaryItem>
              <strong>Kargo Ücreti:</strong> ${SHIPPING_COST.toFixed(2)}
            </SummaryItem>
            <SummaryItem style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              Genel Toplam: ${grandTotal.toFixed(2)}
            </SummaryItem>

            <Button onClick={() => dispatch(clearCart())}>
              🗑️ Sepeti Temizle
            </Button>
            <Button primary onClick={() => navigate("/checkout")}>
              Siparişi Tamamla ✅
            </Button>
          </Summary>
        </>
      )}
    </CartContainer>
  );
};

export default Cart;
