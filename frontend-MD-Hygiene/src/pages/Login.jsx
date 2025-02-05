import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import AuthContext from "../AuthContext";
import { API } from "../services/api";
import {
  LoginContainer,
  LoginWrapper,
  LoginImage,
  LoginForm,
  Title,
  InputContainer,
  InputField,
  Icon,
  Button,
  RegisterText,
} from "../styles/LoginStyles";
import LoginImageSrc from "../assets/login.png"; 
function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
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
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Anmeldung fehlgeschlagen! Falsche E-Mail oder Passwort.");
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      authContext.signin(data.user.id, () => {
        if (data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginWrapper>
        <LoginImage src={LoginImageSrc} alt="Anmeldung" />
        <LoginForm>
          <Title>🔑 Anmeldung</Title>
          <form onSubmit={loginUser}>
            <InputContainer>
              <Icon>
                <FaEnvelope />
              </Icon>
              <InputField
                type="email"
                name="email"
                placeholder="E-Mail-Adresse"
                value={form.email}
                onChange={handleInputChange}
              />
            </InputContainer>

            <InputContainer>
              <Icon>
                <FaLock />
              </Icon>
              <InputField
                type="password"
                name="password"
                placeholder="Passwort"
                value={form.password}
                onChange={handleInputChange}
              />
            </InputContainer>

            <Button type="submit" disabled={loading}>
              {loading ? "Wird angemeldet..." : "Anmelden"} <FaSignInAlt />
            </Button>
          </form>

          <RegisterText>
            Noch kein Konto? <Link to="/register">Jetzt registrieren</Link>
          </RegisterText>
        </LoginForm>
      </LoginWrapper>
    </LoginContainer>
  );
}

export default Login;
