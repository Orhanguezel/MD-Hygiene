import React, { useState } from "react";
import { sendOfferEmail } from "./emailService";
import { Button, Input, TextArea, EmailContainer } from "../styles/offerStyles";

const OfferEmailSender = ({ offer }) => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState(`Teklif: ${offer.id}`);
  const [message, setMessage] = useState("Merhaba, ekte teklifinizi bulabilirsiniz.");
  const [status, setStatus] = useState(null);

  const handleSendEmail = async () => {
    try {
      await sendOfferEmail(recipient, subject, message, offer.pdf);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <EmailContainer>
      <h3>📧 Teklif Gönderimi</h3>
      <Input
        type="email"
        placeholder="Alıcı E-posta"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Konu"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <TextArea
        placeholder="Mesajınız"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={handleSendEmail}>Gönder</Button>

      {status === "success" && <p style={{ color: "green" }}>✅ E-posta başarıyla gönderildi!</p>}
      {status === "error" && <p style={{ color: "red" }}>❌ Gönderim başarısız oldu.</p>}
    </EmailContainer>
  );
};

export default OfferEmailSender;
