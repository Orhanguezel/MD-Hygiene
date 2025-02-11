import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "@/features/auth/authSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { toggleTheme } from "@/features/theme/themeSlice";
import {
  UsersContainer,
  ActionButton,
  Form,
  Input,
  Select,
  ErrorMessage,
  SectionTitle,
} from "../styles/usersStyles";

const AddUserForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { texts } = useLanguage();
  const themeMode = useSelector((state) => state.theme.mode);

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

    if (!formData.name || !formData.email || !formData.password) {
      setError(texts.users.formError);
      return;
    }

    const newUser = {
      ...formData,
      id: `USR-${Date.now()}`,
      profileImage: "https://via.placeholder.com/150",
    };

    dispatch(addUser(newUser));
    navigate("/users");
  };

  return (
    <UsersContainer>
      <SectionTitle>{texts.users.addUser}</SectionTitle>
      <ActionButton onClick={() => dispatch(toggleTheme())}>
        {themeMode === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </ActionButton>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder={texts.users.name}
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder={texts.users.email}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder={texts.users.password}
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Select name="role" value={formData.role} onChange={handleChange}>
          <option value="customer">{texts.users.userRole}</option>
          <option value="admin">{texts.users.adminRole}</option>
          <option value="moderator">{texts.users.moderatorRole}</option>
          <option value="staff">{texts.users.staffRole}</option>
        </Select>
        <ActionButton type="submit">{texts.users.save}</ActionButton>
      </Form>
    </UsersContainer>
  );
};

export default AddUserForm;
