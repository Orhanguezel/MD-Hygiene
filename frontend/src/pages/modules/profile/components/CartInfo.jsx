import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/features/cart/cartSlice";
import { useLanguage } from "@/features/language/useLanguage"; // ✅ Dil Desteği
import { useTheme } from "@/features/theme/useTheme"; // ✅ Tema Desteği
import { Section, CartItem, Button } from "../styles/profileStyles";

const CartInfo = () => {
  const { texts } = useLanguage();  // ✅ Dil dosyasından çeviri al
  const { theme } = useTheme();  // ✅ Tema kontrolü
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <Section theme={theme}>
      <h2>{texts.cart.title}</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CartItem key={item.id} theme={theme}>
            <p>{item.title}</p>
            <p>{texts.cart.quantity}: {item.quantity}</p>
            <p>{texts.cart.total}: ${(item.price * item.quantity).toFixed(2)}</p>
          </CartItem>
        ))
      ) : (
        <p>{texts.cart.empty}</p>
      )}
      <Button theme={theme} onClick={() => dispatch(clearCart())}>{texts.cart.clearCart}</Button>
    </Section>
  );
};

export default CartInfo;
