import { useState } from "react";
import { register } from "@/api/authApi";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import {
  AuthContainer,
  AuthForm,
  Input,
  Button,
  ErrorMessage,
  Title,
} from "@/styles/authStyles"; // ✅ Ortak stil dosyası

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { texts } = useLanguage();
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await register(name, email, password);
      navigate("/login");
    } catch (err) {
      console.error("Kayıt hatası:", err.message);
      setError(err.message);
    }
  };

  return (
    <AuthContainer theme={theme}>
      <AuthForm theme={theme} onSubmit={handleSubmit}>
        <Title theme={theme}>{texts?.auth?.registerTitle || "Kayıt Ol"}</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          theme={theme}
          type="text"
          placeholder={texts?.auth?.namePlaceholder || "Ad Soyad"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          theme={theme}
          type="email"
          placeholder={texts?.auth?.emailPlaceholder || "Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          theme={theme}
          type="password"
          placeholder={texts?.auth?.passwordPlaceholder || "Şifre"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button theme={theme} type="submit">
          {texts?.auth?.registerButton || "Kayıt Ol"}
        </Button>
      </AuthForm>
    </AuthContainer>
  );
}
