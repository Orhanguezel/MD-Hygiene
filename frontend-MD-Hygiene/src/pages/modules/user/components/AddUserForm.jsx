import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "@/features/users/userSlice";
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
  ImagePreview, // ✅ Resim önizleme için yeni bir stil
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
    profileImage: "", // ✅ Base64 resim verisi burada tutulacak
  });
  const [error, setError] = useState("");

  // ✅ Form alanları için değişiklik işleyici
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Resim yükleme işleyici
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result, // Base64 olarak kaydet
        }));
      };
      reader.readAsDataURL(file);
    }
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
      isActive: true,
      createdAt: new Date().toISOString(),
      profileImage: formData.profileImage || "/assets/auth-image.png", // Varsayılan resim
    };

    dispatch(addUser(newUser));
    navigate("/users");
  };

  return (
    <UsersContainer>
      <SectionTitle>{texts.users.addUser}</SectionTitle>

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

        {/* ✅ Resim Yükleme Alanı */}
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {/* ✅ Resim Önizlemesi */}
        {formData.profileImage && (
          <ImagePreview src={formData.profileImage} alt="Profile Preview" />
        )}

        <ActionButton type="submit">{texts.users.save}</ActionButton>
      </Form>
    </UsersContainer>
  );
};

export default AddUserForm;
