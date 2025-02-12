import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { register } from "@/features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
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
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";
import RegisterImageSrc from "@/assets/register-image.png";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { texts } = useLanguage();
  const { theme } = useTheme();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(register(formData));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  return (
    <AuthContainer theme={theme}>
      <Card>
        <AuthImage src={RegisterImageSrc} alt="Register" />

        <AuthForm theme={theme} onSubmit={handleSubmit}>
          <Title theme={theme}>{texts?.auth?.registerTitle || "Kayıt Ol"}</Title>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <InputContainer>
            <Icon><FaUser /></Icon>
            <InputField
              name="name"
              type="text"
              placeholder={texts?.auth?.namePlaceholder || "Ad Soyad"}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </InputContainer>

          <InputContainer>
            <Icon><FaEnvelope /></Icon>
            <InputField
              name="email"
              type="email"
              placeholder={texts?.auth?.emailPlaceholder || "Email"}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputContainer>

          <InputContainer>
            <Icon><FaLock /></Icon>
            <InputField
              name="password"
              type="password"
              placeholder={texts?.auth?.passwordPlaceholder || "Şifre"}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </InputContainer>

          <Button theme={theme} type="submit" disabled={loading}>
            {loading ? "Kayıt Yapılıyor..." : <>Kayıt Ol <FaUserPlus /></>}
          </Button>

          <SwitchText>
            {texts?.auth?.haveAccount || "Zaten hesabınız var mı?"} <Link to="/login">Giriş Yap</Link>
          </SwitchText>

          {loading && <LoadingSpinner />}
        </AuthForm>
      </Card>
    </AuthContainer>
  );
};

export default Register;
