import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterContainer, RegisterForm, RegisterImage } from "../styles/RegisterStyles";
import { Input, Button } from "../styles/GlobalStyles";
import RegisterImageSrc from "../assets/Login.png";

const API_URL = import.meta.env.VITE_API_URL; // ✅ .env dosyasından API URL alınıyor.

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      alert("Lütfen gerekli alanları doldurun.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Kayıt başarısız! Email zaten kayıtlı olabilir.");
      }

      alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <RegisterForm>
        <h2>Hesap Oluştur</h2>
        <form onSubmit={registerUser}>
          <Input
            name="name"
            type="text"
            required
            placeholder="Tam Adınız"
            value={form.name}
            onChange={handleInputChange}
          />
          <Input
            name="email"
            type="email"
            required
            placeholder="Email adresi"
            value={form.email}
            onChange={handleInputChange}
          />
          <Input
            name="password"
            type="password"
            required
            placeholder="Şifre"
            value={form.password}
            onChange={handleInputChange}
          />
          <Input
            name="phone"
            type="text"
            placeholder="Telefon Numarası"
            value={form.phone}
            onChange={handleInputChange}
          />
          <Input
            name="address"
            type="text"
            placeholder="Adres"
            value={form.address}
            onChange={handleInputChange}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Kayıt Olunuyor..." : "Kayıt Ol"}
          </Button>
        </form>
        <p>
          Zaten bir hesabınız var mı? <Link to="/login">Giriş yap</Link>
        </p>
      </RegisterForm>
      <RegisterImage src={RegisterImageSrc} alt="Register" />
    </RegisterContainer>
  );
}

export default Register;
