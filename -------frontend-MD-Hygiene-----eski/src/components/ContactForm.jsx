import { useState } from "react";
import axios from "axios";
import {
  FormContainer,
  StyledForm,
  Label,
  Input,
  Textarea,
  SubmitButton,
} from "../styles/ContactFormStyles"; // Stiller ayrı dosyadan çağırılıyor

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5010/api";

console.log(`🌍 Aktuelle Umgebung: ${import.meta.env.MODE}`);
console.log(`📡 API URL: ${API_URL}`);

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!form.name || !form.email || !form.message) {
      setError("Bitte füllen Sie alle Felder aus.");
      setLoading(false);
      return;
    }

    try {
      console.log("📩 API-Anfrage wird gesendet:", `${API_URL}/mail/send-email`);

      const response = await axios.post(`${API_URL}/mail/send-email`, form, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setSubmitted(true);
      } else {
        throw new Error(`Serverfehler: ${response.status}`);
      }
    } catch (err) {
      console.error("❌ Fehler beim Senden:", err);

      if (err.response) {
        setError(`Serverfehler: ${err.response.status} - ${err.response.data.message}`);
      } else if (err.request) {
        setError("Server nicht erreichbar. Bitte überprüfen Sie Ihre Internetverbindung.");
      } else {
        setError("Ein unbekannter Fehler ist aufgetreten.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      {submitted ? (
        <h2>Danke für Ihre Nachricht! Wir melden uns bald bei Ihnen.</h2>
      ) : (
        <StyledForm onSubmit={handleSubmit}>
          <h2>Kontaktformular</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Label htmlFor="name">Name:</Label>
          <Input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
          <Label htmlFor="email">E-Mail:</Label>
          <Input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
          <Label htmlFor="message">Nachricht:</Label>
          <Textarea id="message" name="message" value={form.message} onChange={handleChange} required />
          <SubmitButton type="submit" disabled={loading}>{loading ? "Wird gesendet..." : "Senden"}</SubmitButton>
        </StyledForm>
      )}
    </FormContainer>
  );
}

export default ContactForm;
