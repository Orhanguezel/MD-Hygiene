import { useState } from "react";
import axios from "axios";
import {
  FormContainer,
  StyledForm,
  Label,
  Input,
  Textarea,
  SubmitButton,
} from "../styles/ContactFormStyles";

// ✅ Ortama göre API URL’sini seç
const API_URL = import.meta.env.VITE_API_URL;

console.log(`🌍 Çalışan Ortam: ${import.meta.env.MODE}`);
console.log(`📡 API URL: ${API_URL}`);

function ContactForm({ formData }) {
  const [form, setForm] = useState(formData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("📩 API isteği gönderiliyor:", `${API_URL}/mail/send-email`);

      const response = await axios.post(`${API_URL}/mail/send-email`, form, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setSubmitted(true);
      } else {
        throw new Error(`Sunucu hatası: ${response.status}`);
      }
    } catch (err) {
      console.error("❌ Fehler beim Senden:", err);
      
      if (err.response) {
        console.error("📡 API Hata Yanıtı:", err.response.data);
        setError(`Server Error: ${err.response.status} - ${err.response.data.message}`);
      } else if (err.request) {
        console.error("🌍 Sunucuya ulaşılmadı:", err.request);
        setError("Sunucuya ulaşılamadı. Lütfen internet bağlantınızı kontrol edin.");
      } else {
        setError("Bilinmeyen bir hata oluştu.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      {submitted ? (
        <h2>Danke für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.</h2>
      ) : (
        <StyledForm onSubmit={handleSubmit}>
          <h2>Kontaktformular</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Label htmlFor="name">Name:</Label>
          <Input type="text" id="name" name="name" value={form.name || ""} onChange={handleChange} required />
          <Label htmlFor="email">E-Mail:</Label>
          <Input type="email" id="email" name="email" value={form.email || ""} onChange={handleChange} required />
          <Label htmlFor="message">Nachricht:</Label>
          <Textarea id="message" name="message" value={form.message || ""} onChange={handleChange} required></Textarea>
          <SubmitButton type="submit" disabled={loading}>{loading ? "Wird gesendet..." : "Senden"}</SubmitButton>
        </StyledForm>
      )}
    </FormContainer>
  );
}

export default ContactForm;
