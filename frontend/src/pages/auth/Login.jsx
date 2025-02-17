import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { useNavigate, Link } from "react-router-dom";
import { login } from "@/features/auth/authSlice";
import {
  AuthContainer,
  Card,
  AuthImage,
  AuthForm,
  Title,
  InputContainer,
  InputField,
  Icon,
  Button,
  SwitchText,
  ErrorMessage,
  LoadingSpinner,
} from "./styles/authStyles";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import LoginImageSrc from "@/assets/login-image.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { texts } = useLanguage();
  const { theme } = useTheme();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));

    if (result.meta.requestStatus === "fulfilled") {
      if (user?.role === "admin") {
        navigate("/dashboard"); // ✅ Admin giriş yapınca dashboard'a yönlendir
      } else {
        navigate("/"); // ✅ Kullanıcı giriş yapınca ana sayfaya yönlendir
      }
    }
  };

  return (
    <AuthContainer theme={theme}>
      <Card theme={theme}>
        <AuthImage src={LoginImageSrc} alt="Login" />

        <AuthForm onSubmit={handleSubmit}>
          <Title theme={theme}>
            {texts?.auth?.loginTitle || "🔑 Giriş Yap"}
          </Title>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <InputContainer theme={theme}>
            <Icon theme={theme}>
              <FaEnvelope />
            </Icon>
            <InputField
              type="email"
              placeholder={texts?.auth?.emailPlaceholder || "Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputContainer>

          <InputContainer theme={theme}>
            <Icon theme={theme}>
              <FaLock />
            </Icon>
            <InputField
              type="password"
              placeholder={texts?.auth?.passwordPlaceholder || "Şifre"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputContainer>

          <Button type="submit" disabled={loading} theme={theme}>
            {loading ? texts.auth.loggingIn : texts.auth.loginButton}{" "}
            <FaSignInAlt />
          </Button>

          <SwitchText theme={theme}>
            {texts?.auth?.noAccount || "Hesabınız yok mu?"}{" "}
            <Link to="/register">{texts?.auth?.register || "Kayıt Ol"}</Link>
          </SwitchText>

          {loading && <LoadingSpinner theme={theme} />}
        </AuthForm>
      </Card>
    </AuthContainer>
  );
};

export default Login;
