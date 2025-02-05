import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaUserPlus } from "react-icons/fa";
import { API } from "../services/api";
import {
  RegisterContainer,
  RegisterForm,
  RegisterImage,
  Title,
  InputContainer,
  InputField,
  Icon,
  Button,
  LoginText,
} from "../styles/RegisterStyles";
import RegisterImageSrc from "../assets/login.png"; 

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

      if (!response.ok) {
        throw new Error("Registrierung fehlgeschlagen! Die E-Mail ist möglicherweise bereits registriert.");
      }

      alert("Registrierung erfolgreich! Sie können sich jetzt anmelden.");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <RegisterImage src={RegisterImageSrc} alt="Registrieren" />
      <RegisterForm>
        <Title>👤 Registrierung</Title>
        <form onSubmit={registerUser}>
          <InputContainer>
            <Icon>
              <FaUser />
            </Icon>
            <InputField
              name="name"
              type="text"
              required
              placeholder="Vollständiger Name"
              value={form.name}
              onChange={handleInputChange}
            />
          </InputContainer>

          <InputContainer>
            <Icon>
              <FaEnvelope />
            </Icon>
            <InputField
              name="email"
              type="email"
              required
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
              name="password"
              type="password"
              required
              placeholder="Passwort"
              value={form.password}
              onChange={handleInputChange}
            />
          </InputContainer>

          <InputContainer>
            <Icon>
              <FaPhone />
            </Icon>
            <InputField
              name="phone"
              type="text"
              placeholder="Telefonnummer"
              value={form.phone}
              onChange={handleInputChange}
            />
          </InputContainer>

          <InputContainer>
            <Icon>
              <FaMapMarkerAlt />
            </Icon>
            <InputField
              name="address"
              type="text"
              placeholder="Adresse"
              value={form.address}
              onChange={handleInputChange}
            />
          </InputContainer>

          <Button type="submit" disabled={loading}>
            {loading ? "Wird registriert..." : "Registrieren"} <FaUserPlus />
          </Button>
        </form>

        <LoginText>
          Haben Sie bereits ein Konto? <Link to="/login">Jetzt anmelden</Link>
        </LoginText>
      </RegisterForm>
    </RegisterContainer>
  );
}

export default Register;
