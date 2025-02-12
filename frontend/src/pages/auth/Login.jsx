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
  LoadingSpinner
} from "./styles/authStyles";
import { FaEnvelope, FaLock, FaSignInAlt} from "react-icons/fa";
import LoginImageSrc from "@/assets/login-image.png";

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
    <AuthContainer>
      <Card>
        <AuthImage src={LoginImageSrc} alt="Login" />

        <AuthForm onSubmit={handleSubmit}>
          <Title>{texts?.auth?.loginTitle || "🔑 Giriş Yap"}</Title>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <InputContainer>
            <Icon><FaEnvelope /></Icon>
            <InputField
              type="email"
              placeholder={texts?.auth?.emailPlaceholder || "Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputContainer>

          <InputContainer>
            <Icon><FaLock /></Icon>
            <InputField
              type="password"
              placeholder={texts?.auth?.passwordPlaceholder || "Şifre"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputContainer>

          <Button type="submit" disabled={loading}>
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"} <FaSignInAlt />
          </Button>

          <SwitchText>
            {texts?.auth?.noAccount || "Hesabınız yok mu?"} {" "}
            <Link to="/register">{texts?.auth?.register || "Kayıt Ol"}</Link>
          </SwitchText>

          {loading && <LoadingSpinner />}
        </AuthForm>
      </Card>
    </AuthContainer>
  );
};

export default Login;
