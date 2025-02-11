import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { useNavigate, Link } from "react-router-dom";
import { login } from "@/features/auth/authSlice";
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
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
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

        <Button theme={theme} type="submit" disabled={loading}>
          {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </Button>

        <p>
          {texts?.auth?.noAccount || "Hesabınız yok mu?"} <Link to="/register">Kayıt Ol</Link>
        </p>

        {loading && <LoadingSpinner />}
      </AuthForm>
    </AuthContainer>
  );
};

export default Login;
