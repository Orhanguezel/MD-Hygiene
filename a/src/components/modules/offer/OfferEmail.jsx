// 📂 components/offer/OfferEmail.jsx
import { useState } from "react";
import { sendOfferEmail } from "../../api/offerApi";
import { Button, Input, EmailForm } from "../../styles/OfferStyles";

const OfferEmail = ({ offer }) => {
  const [recipient, setRecipient] = useState("");

  const handleSendEmail = async () => {
    if (!recipient) {
      alert("📩 Lütfen alıcı e-posta adresini girin!");
      return;
    }

    try {
      await sendOfferEmail(offer.id, recipient);
      alert("✅ Teklif başarıyla e-posta ile gönderildi!");
    } catch (error) {
      alert("❌ Teklif e-posta ile gönderilemedi.");
      console.error(error);
    }
  };

  return (
    <EmailForm>
      <h3>📩 Teklifi E-Posta ile Gönder</h3>
      <Input
        type="email"
        placeholder="Alıcı E-Posta"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <Button onClick={handleSendEmail}>📤 Gönder</Button>
    </EmailForm>
  );
};

export default OfferEmail;
