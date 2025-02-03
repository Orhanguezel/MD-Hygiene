import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContainer, LoginForm, LoginImage } from "../styles/LoginStyles";
import { Input, Button } from "../styles/GlobalStyles";
import AuthContext from "../AuthContext";
import LoginImageSrc from "../assets/signup.jpg";

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
      alert("Lütfen e-posta ve şifre girin.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5010/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Giriş başarısız! Email veya şifre hatalı.");
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
      <LoginImage src={LoginImageSrc} alt="Login" />
      <LoginForm>
        <h2>Hesabınıza Giriş Yapın</h2>
        <form onSubmit={loginUser}>
          <Input
            type="email"
            name="email"
            placeholder="Email adresi"
            value={form.email}
            onChange={handleInputChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Şifre"
            value={form.password}
            onChange={handleInputChange}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </Button>
        </form>
        <p>
          Henüz hesabınız yok mu? <Link to="/register">Kayıt ol</Link>
        </p>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
