// ✅ AddUserForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import dummyUsers from "../data/users.json";
import { UsersContainer, ActionButton } from "../styles/usersStyles";

const AddUserForm = () => {
  const { texts } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    isActive: true,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // ✅ Kullanıcı ID'si oluştur
    const newUser = {
      ...formData,
      id: `USR-${Date.now()}`,
      profileImage: "https://via.placeholder.com/150",
    };

    dummyUsers.push(newUser); // ✅ Dummy veriye ekle
    navigate("/users"); // ✅ Kullanıcılar sayfasına yönlendir
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
          <option value="customer">{texts.users.userRole}</option>
          <option value="admin">{texts.users.adminRole}</option>
          <option value="moderator">{texts.users.moderatorRole}</option>
          <option value="staff">{texts.users.staffRole}</option>
        </select>
        <ActionButton type="submit">{texts.users.save}</ActionButton>
      </form>
    </UsersContainer>
  );
};

export default AddUserForm;
