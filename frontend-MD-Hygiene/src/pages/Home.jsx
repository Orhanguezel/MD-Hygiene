import { useState, useContext } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import { API } from "../services/api";
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
  LogoContainer,
  LogoImage,
  SiteTitle,
} from "../styles/LoginRegisterStyles";
import LoginImageSrc from "../assets/login-image.png";
import RegisterImageSrc from "../assets/register-image.png";
import SiteLogo from "../assets/logo.png";

function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      alert("Bitte geben Sie Ihre E-Mail und Ihr Passwort ein!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API.USERS}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      if (!response.ok) throw new Error("Anmeldung fehlgeschlagen!");

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      authContext.signin(data.user.id, () => navigate("/admin/dashboard"));
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      alert("Bitte füllen Sie die erforderlichen Felder aus!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API.USERS}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Registrierung fehlgeschlagen!");

      alert("Registrierung erfolgreich! Sie können sich jetzt anmelden.");
      setIsLogin(true);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <LogoContainer>
        <LogoImage src={SiteLogo} alt="Site Logo" />
        <SiteTitle>Mein Admin Panel</SiteTitle>
      </LogoContainer>

      <Card>
        <AuthImage src={isLogin ? LoginImageSrc : RegisterImageSrc} alt="Auth" />
        
        <AuthForm>
          <Title>{isLogin ? "🔑 Anmeldung" : "👤 Registrierung"}</Title>
          <form onSubmit={isLogin ? handleLogin : handleRegister}>
            {!isLogin && (
              <InputContainer>
                <Icon><FaUser /></Icon>
                <InputField name="name" type="text" placeholder="Vollständiger Name" value={form.name} onChange={handleInputChange} />
              </InputContainer>
            )}

            <InputContainer>
              <Icon><FaEnvelope /></Icon>
              <InputField name="email" type="email" placeholder="E-Mail-Adresse" value={form.email} onChange={handleInputChange} />
            </InputContainer>

            <InputContainer>
              <Icon><FaLock /></Icon>
              <InputField name="password" type="password" placeholder="Passwort" value={form.password} onChange={handleInputChange} />
            </InputContainer>

            {!isLogin && (
              <>
                <InputContainer>
                  <Icon><FaPhone /></Icon>
                  <InputField name="phone" type="text" placeholder="Telefonnummer" value={form.phone} onChange={handleInputChange} />
                </InputContainer>

                <InputContainer>
                  <Icon><FaMapMarkerAlt /></Icon>
                  <InputField name="address" type="text" placeholder="Adresse" value={form.address} onChange={handleInputChange} />
                </InputContainer>
              </>
            )}

            <Button type="submit" disabled={loading}>
              {loading ? "Wird geladen..." : isLogin ? "Anmelden" : "Registrieren"} {isLogin ? <FaSignInAlt /> : <FaUserPlus />}
            </Button>
          </form>

          <SwitchText>
            {isLogin ? (
              <>Noch kein Konto? <button onClick={() => setIsLogin(false)}>Jetzt registrieren</button></>
            ) : (
              <>Bereits ein Konto? <button onClick={() => setIsLogin(true)}>Jetzt anmelden</button></>
            )}
          </SwitchText>
        </AuthForm>
      </Card>
    </AuthContainer>
  );
}

export default Home;
