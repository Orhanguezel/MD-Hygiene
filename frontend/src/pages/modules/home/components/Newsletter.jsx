import { useState } from "react";
import { useLanguage } from "@/features/language/useLanguage"; // ✅ Dil Desteği
import { useTheme } from "@/features/theme/useTheme"; // ✅ Tema Desteği
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  NewsletterContainer,
  NewsletterTitle,
  NewsletterInput,
  SubscribeButton,
  NewsletterForm,
} from "../styles/NewsletterStyles";

const Newsletter = () => {
  const { texts } = useLanguage();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email.trim()) {
      toast.error(texts.home.toastMessages?.emptyEmail || "❌ Lütfen geçerli bir e-posta girin!");
      return;
    }

    toast.success(`${texts.home.toastMessages?.thankYou || "✅ Teşekkürler!"} ${email}`);
    setEmail("");
  };

  return (
    <NewsletterContainer theme={theme}>
      <NewsletterTitle theme={theme}>{texts.home.newsletterTitle}</NewsletterTitle>
      <NewsletterForm>
        <NewsletterInput
          type="email"
          placeholder={texts.home.enterEmail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          theme={theme}
        />
        <SubscribeButton onClick={handleSubscribe} theme={theme}>
          {texts.home.subscribe}
        </SubscribeButton>
      </NewsletterForm>
    </NewsletterContainer>
  );
};

export default Newsletter;
