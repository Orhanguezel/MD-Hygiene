// ✅ AddUserForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { addUser } from "@/api/userApi";
import { useAuth } from "@/context/AuthContext";
import { UsersContainer, ActionButton } from "../styles/usersStyles";

const AddUserForm = () => {
  const { texts } = useLanguage();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await addUser(formData, token);
      navigate("/users");
    } catch (err) {
      console.error("Error adding user:", err);
      setError(texts.users.addError || "Kullanıcı eklenirken bir hata oluştu.");
    }
  };

  return (
    <UsersContainer>
      <h1>{texts.users.addUser}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder={texts.users.name}
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder={texts.users.email}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder={texts.users.password}
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">{texts.users.userRole}</option>
          <option value="admin">{texts.users.adminRole}</option>
        </select>
        <ActionButton type="submit">{texts.users.save}</ActionButton>
      </form>
    </UsersContainer>
  );
};

export default AddUserForm;
