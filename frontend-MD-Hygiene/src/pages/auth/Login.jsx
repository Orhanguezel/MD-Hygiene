import { useState } from "react";
import { useAuth } from "@/features/auth/useAuth"; // ✅ RTK uyumlu Auth
import { useLanguage } from "@/features/language/useLanguage"; // ✅ Dil desteği
import { useTheme } from "@/features/theme/useTheme"; // ✅ Tema desteği
import { useNavigate } from "react-router-dom";
import { login } from "@/api/authApi";
import {
  AuthContainer,
  AuthForm,
  Input,
  Button,
  ErrorMessage,
  Title,
} from "@/styles/authStyles"; // ✅ Ortak stil dosyası

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signin } = useAuth();
  const { texts } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userData = await login(email, password);
      signin(userData);
      navigate("/dashboard");
    } catch (err) {
      console.error("Giriş hatası:", err.message);
      setError(err.message);
    }
  };

  return (
    <AuthContainer theme={theme}>
      <AuthForm theme={theme} onSubmit={handleSubmit}>
        <Title theme={theme}>{texts?.auth?.loginTitle || "Giriş Yap"}</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
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
          {texts?.auth?.loginButton || "Giriş Yap"}
        </Button>
      </AuthForm>
    </AuthContainer>
  );
};

export default Login;
