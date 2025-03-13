import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/features/auth/authSlice"; // ✅ `register` kullanıldı
import { useLanguage } from "@/features/language/useLanguage";
import {
  UsersContainer,
  ActionButton,
  Form,
  Input,
  Select,
  ErrorMessage,
  SectionTitle,
  ImagePreview,
} from "../styles/usersStyles";

const AddUserForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { texts } = useLanguage();
  const { error, loading } = useSelector((state) => state.auth); // ✅ Auth state kullanıldı

  // 📌 **Başlangıç Form Değerleri**
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Varsayılan olarak "user" seçili olacak
    isActive: true,
    phone: "",
    profileImage: "", // Base64 olarak tutulacak
  });

  // 📌 **Form Alanlarını Güncelleme**
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📌 **Profil Resmi Yükleme**
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result, // ✅ Base64 olarak kaydedilecek
        }));
      };
      reader.readAsDataURL(file);
    }
  };

 // 📌 **Formu Gönderme İşlemi**
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await dispatch(register(formData)).unwrap();
    console.log("✅ Kayıt Başarılı:", response);

    if (!response.token) {
      console.warn("⚠️ Kullanıcı kaydedildi ancak token alınamadı!");
    }

    navigate("/users"); // ✅ Kullanıcı başarıyla eklenince yönlendir
  } catch (err) {
    console.error("❌ Kayıt hatası:", err);
  }
};


  return (
    <UsersContainer>
      <SectionTitle>{texts.users.addUser}</SectionTitle>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form onSubmit={handleSubmit}>
        {/* ✅ Kullanıcı Adı */}
        <Input
          type="text"
          name="name"
          placeholder={texts.users.name}
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* ✅ E-posta */}
        <Input
          type="email"
          name="email"
          placeholder={texts.users.email}
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* ✅ Şifre */}
        <Input
          type="password"
          name="password"
          placeholder={texts.users.password}
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* ✅ Telefon Numarası */}
        <Input
          type="tel"
          name="phone"
          placeholder={texts.users.phone}
          value={formData.phone}
          onChange={handleChange}
        />

        {/* ✅ Kullanıcı Rolü */}
        <Select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">{texts.users.userRole}</option>
          <option value="admin">{texts.users.adminRole}</option>
          <option value="moderator">{texts.users.moderatorRole}</option>
          <option value="staff">{texts.users.staffRole}</option>
        </Select>

        {/* ✅ Kullanıcı Aktif/Pasif */}
        <Select name="isActive" value={formData.isActive} onChange={handleChange}>
          <option value={true}>{texts.users.active}</option>
          <option value={false}>{texts.users.inactive}</option>
        </Select>

        {/* 📌 **Profil Resmi Yükleme Alanı** */}
        <SectionTitle>{texts.users.uploadProfileImage}</SectionTitle>
        <Input type="file" accept="image/*" onChange={handleImageUpload} />

        {/* ✅ **Profil Resmi Önizleme** */}
        {formData.profileImage && (
          <ImagePreview src={formData.profileImage} alt="Profile Preview" />
        )}

        {/* 📌 **Kaydet Butonu** */}
        <ActionButton type="submit" disabled={loading}>
          {loading ? texts.users.saving : texts.users.save}
        </ActionButton>
      </Form>
    </UsersContainer>
  );
};

export default AddUserForm;
