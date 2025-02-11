import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { useNavigate } from "react-router-dom";
import { login } from "@/features/auth/authSlice"; // ✅ Redux Toolkit login işlemi
import {
  AuthContainer,
  AuthForm,
  Input,
  Button,
  ErrorMessage,
  Title,
  LoadingSpinner,
} from "@/styles/authStyles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { texts } = useLanguage();
  const { theme } = useTheme();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(login({ email, password }));
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/dashboard"); // ✅ Giriş başarılıysa yönlendir
      }
    } catch (err) {
      console.error("Giriş hatası:", err);
    }
  };

  return (
    <AuthContainer theme={theme}>
      <AuthForm theme={theme} onSubmit={handleSubmit}>
        <Title theme={theme}>{texts?.auth?.loginTitle || "Giriş Yap"}</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>} {/* ✅ Hata mesajı */}

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

        <Button theme={theme} type="submit" disabled={loading}>
          {loading
            ? texts?.auth?.loading || "Giriş Yapılıyor..."
            : texts?.auth?.loginButton || "Giriş Yap"}
        </Button>

        {loading && <LoadingSpinner />} {/* ✅ Yüklenme animasyonu */}
      </AuthForm>
    </AuthContainer>
  );
};

export default Login;
