import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/features/cart/cartSlice";
import { Section, CartItem, Button } from "../styles/profileStyles";

const CartInfo = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <Section>
      <h2>🛒 Sepetim</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CartItem key={item.id}>
            <p>{item.title}</p>
            <p>Adet: {item.quantity}</p>
            <p>Toplam: ${(item.price * item.quantity).toFixed(2)}</p>
          </CartItem>
        ))
      ) : (
        <p>Sepetiniz boş.</p>
      )}
      <Button onClick={() => dispatch(clearCart())}>Sepeti Temizle</Button>
    </Section>
  );
};

export default CartInfo;
