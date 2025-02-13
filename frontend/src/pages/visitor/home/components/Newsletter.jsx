import { useState } from "react";
import { useLanguage } from "@/features/language/useLanguage"; // ✅ Dil Desteği
import {
  NewsletterContainer,
  NewsletterTitle,
  NewsletterInput,
  SubscribeButton,
} from "../styles/NewsletterStyles";

const Newsletter = () => {
  const { texts } = useLanguage();
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      alert(`${texts.home.thankYou} ${email}`);
      setEmail("");
    }
  };

  return (
    <NewsletterContainer>
      <NewsletterTitle>{texts.home.newsletterTitle}</NewsletterTitle>
      <NewsletterInput
        type="email"
        placeholder={texts.home.enterEmail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <SubscribeButton onClick={handleSubscribe}>{texts.home.subscribe}</SubscribeButton>
    </NewsletterContainer>
  );
};

export default Newsletter;
