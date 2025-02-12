// ✅ src/pages/visitor/home/components/Newsletter.jsx
import { useState } from "react";
import {
  NewsletterContainer,
  NewsletterTitle,
  NewsletterInput,
  SubscribeButton,
} from "../styles/NewsletterStyles";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      alert(`Teşekkürler! Abone oldunuz: ${email}`);
      setEmail("");
    }
  };

  return (
    <NewsletterContainer>
      <NewsletterTitle>Bültenimize Abone Olun</NewsletterTitle>
      <NewsletterInput
        type="email"
        placeholder="E-posta adresinizi girin"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <SubscribeButton onClick={handleSubscribe}>Abone Ol</SubscribeButton>
    </NewsletterContainer>
  );
};

export default Newsletter;
