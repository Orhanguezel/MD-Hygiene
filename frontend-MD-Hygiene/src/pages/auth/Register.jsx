import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { register } from "@/features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import {
  AuthContainer,
  AuthForm,
  Input,
  Button,
  ErrorMessage,
  Title,
  LoadingSpinner,
} from "@/styles/authStyles";

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
      <AuthForm theme={theme} onSubmit={handleSubmit}>
        <Title theme={theme}>{texts?.auth?.registerTitle || "Kayıt Ol"}</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Input
          theme={theme}
          type="text"
          name="name"
          placeholder={texts?.auth?.namePlaceholder || "Ad Soyad"}
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input
          theme={theme}
          type="email"
          name="email"
          placeholder={texts?.auth?.emailPlaceholder || "Email"}
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          theme={theme}
          type="password"
          name="password"
          placeholder={texts?.auth?.passwordPlaceholder || "Şifre"}
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Button theme={theme} type="submit" disabled={loading}>
          {loading ? "Kayıt Yapılıyor..." : "Kayıt Ol"}
        </Button>

        <p>
          {texts?.auth?.haveAccount || "Zaten hesabınız var mı?"} <Link to="/login">Giriş Yap</Link>
        </p>

        {loading && <LoadingSpinner />}
      </AuthForm>
    </AuthContainer>
  );
};

export default Register;
