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
} from "./styles/authStyles"; // ✅ Ortak stil dosyası kullanıldı
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";
import RegisterImageSrc from "@/assets/register-image.png";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
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
      navigate("/login"); // ✅ Kayıt sonrası giriş sayfasına yönlendirme
    }
  };

  return (
    <AuthContainer theme={theme}>
      <Card theme={theme}>
        <AuthImage src={RegisterImageSrc} alt="Register" />

        <AuthForm theme={theme} onSubmit={handleSubmit}>
          <Title theme={theme}>
            {texts?.auth?.registerTitle || "📝 Kayıt Ol"}
          </Title>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <InputContainer theme={theme}>
            <Icon theme={theme}>
              <FaUser />
            </Icon>
            <InputField
              name="name"
              type="text"
              placeholder={texts?.auth?.namePlaceholder || "Ad Soyad"}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </InputContainer>

          <InputContainer theme={theme}>
            <Icon theme={theme}>
              <FaEnvelope />
            </Icon>
            <InputField
              name="email"
              type="email"
              placeholder={texts?.auth?.emailPlaceholder || "Email"}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputContainer>

          <InputContainer theme={theme}>
            <Icon theme={theme}>
              <FaLock />
            </Icon>
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
            {loading ? texts.auth.registerTitle : texts.auth.registerButton}
            {""}
            <FaUserPlus />
          </Button>

          <SwitchText theme={theme}>
            {texts?.auth?.haveAccount || "Zaten hesabınız var mı?"}{" "}
            <Link to="/login">{texts?.auth?.login || "Giriş Yap"}</Link>
          </SwitchText>

          {loading && <LoadingSpinner theme={theme} />}
        </AuthForm>
      </Card>
    </AuthContainer>
  );
};

export default Register;
