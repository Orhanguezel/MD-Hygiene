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

// 🟢 Ortama göre API URL’sini al
const API_URL = `${import.meta.env.VITE_API_URL}`;


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
      console.log("📩 API isteği gönderiliyor:", `${API_URL}/send-email`);

      const response = await axios.post(API_URL, form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      

      if (response.status === 200) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("❌ Fehler beim Senden:", err);
      setError("Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.");
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
          <Input
            type="text"
            id="name"
            name="name"
            value={form.name || ""}
            placeholder="Ihr Name"
            required
            onChange={handleChange}
          />
          <Label htmlFor="email">E-Mail:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={form.email || ""}
            placeholder="Ihre E-Mail-Adresse"
            required
            onChange={handleChange}
          />
          <Label htmlFor="message">Nachricht:</Label>
          <Textarea
            id="message"
            name="message"
            value={form.message || ""}
            placeholder="Ihre Nachricht..."
            required
            onChange={handleChange}
          ></Textarea>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Wird gesendet..." : "Senden"}
          </SubmitButton>
        </StyledForm>
      )}
    </FormContainer>
  );
}

export default ContactForm;
