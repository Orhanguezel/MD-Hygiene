import { useState } from "react";
import axios from "axios";
import { AuthContainer, Input, Button } from "../styles/AuthFormStyles";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5010/api";


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (isLogin) {
        // Kullanıcı girişi
        const response = await axios.post(`${API_URL}/users/login`, {
          email: formData.email,
          password: formData.password,
        });
        setSuccess("Erfolgreich eingeloggt!");
        localStorage.setItem("token", response.data.token);
      } else {
        // Kayıt ol
        await axios.post(`${API_URL}/users/register`, formData);
        setSuccess("Registrierung erfolgreich! Bitte jetzt einloggen.");
        setIsLogin(true);
      }
    } catch (err) {
      setError("Fehler: " + err.response?.data?.message || "Unbekannter Fehler");
    }
  };

  return (
    <AuthContainer>
      <h2>{isLogin ? "Anmeldung" : "Registrierung"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        <Input
          type="email"
          name="email"
          placeholder="E-Mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Passwort"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit">{isLogin ? "Einloggen" : "Registrieren"}</Button>
      </form>
      <p>
        {isLogin ? "Kein Konto?" : "Bereits registriert?"}{" "}
        <span
          style={{ color: "#007bff", cursor: "pointer" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Jetzt registrieren!" : "Hier einloggen!"}
        </span>
      </p>
    </AuthContainer>
  );
};

export default AuthForm;
