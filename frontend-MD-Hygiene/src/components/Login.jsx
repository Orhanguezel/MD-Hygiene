import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5010/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/users/login`, { email, password });
      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        console.log("✅ Login erfolgreich! Token gespeichert.");
        navigate("/dashboard"); // Giriş sonrası yönlendirme
      }
    } catch (err) {
      console.error("❌ Fehler beim Login:", err);
      setError("Fehler: Falsche E-Mail oder Passwort!");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Passwort:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Anmelden</button>
      </form>
    </div>
  );
};

export default Login;
