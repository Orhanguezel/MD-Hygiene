import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/features/auth/authSlice"; // ✅ Redux Register işlemi
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
  const { error, loading } = useSelector((state) => state.auth); // ✅ Redux Auth state

  // 📌 **Başlangıç Form Değerleri**
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    isActive: true,
    phone: "",
    profileImage: null, // ✅ Dosya olarak tutulacak
    bio: "",
    birthDate: "",
    addresses: [
      { street: "", city: "", postalCode: "", country: "", isDefault: false },
    ],
    socialMedia: { facebook: "", twitter: "", instagram: "" },
    notifications: { emailNotifications: true, smsNotifications: false },
  });

  // 📌 **Form Alanlarını Güncelleme**
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📌 **Adres Güncelleme**
  const handleAddressChange = (index, e) => {
    const newAddresses = [...formData.addresses];
    newAddresses[index][e.target.name] = e.target.value;
    setFormData({ ...formData, addresses: newAddresses });
  };

  // 📌 **Profil Resmi Yükleme**
// 📌 **Profil Resmi Yükleme**
const handleImageUpload = (e) => {
  const file = e.target.files[0];

  if (file) {
      if (file.type.startsWith("image/")) {
          setFormData((prev) => ({
              ...prev,
              profileImage: file, // ✅ `File` nesnesi olarak saklanıyor
          }));
      } else {
          console.error("❌ Desteklenmeyen dosya türü! Sadece resim yükleyin.");
      }
  }
};



  // 📌 **Formu Gönderme İşlemi**
 // 📌 **Formu Gönderme İşlemi**
const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ FormData Kullanımı (Dosya Upload için)
  const userData = new FormData();
  userData.append("name", formData.name);
  userData.append("email", formData.email);
  userData.append("password", formData.password);
  userData.append("role", formData.role);
  userData.append("isActive", formData.isActive);
  userData.append("phone", formData.phone || "");
  userData.append("bio", formData.bio);

  if (formData.birthDate) {
      userData.append("birthDate", new Date(formData.birthDate).toISOString()); // ✅ Tarih formatı düzeltildi
  }

  // 📌 JSON Verileri String Olarak Ekleniyor
  userData.append("addresses", JSON.stringify(formData.addresses)); 
  userData.append("socialMedia", JSON.stringify(formData.socialMedia));
  userData.append("notifications", JSON.stringify(formData.notifications));

  // 📌 **Profil Resmi Yükleme Kontrolü**
  if (formData.profileImage && formData.profileImage instanceof File) {
      userData.append("profileImage", formData.profileImage); // ✅ Eğer dosya ise dosya olarak ekleniyor
  } else if (formData.profileImage && typeof formData.profileImage === "string") {
      userData.append("profileImageBase64", formData.profileImage); // ✅ Eğer Base64 formatında ise ayrı key ile gönder
  }

  // 📌 **Gönderilen Veriyi Konsola Yazdır**
  for (let pair of userData.entries()) {
      console.log("📤 Gönderilen:", pair[0], pair[1]);
  }

  try {
      const response = await dispatch(register(userData)).unwrap();
      console.log("✅ Kayıt Başarılı:", response);
      navigate("/users");
  } catch (err) {
      console.error("❌ Kayıt hatası:", err);
  }
};


  return (
    <UsersContainer>
      <SectionTitle>{texts.users.addUser}</SectionTitle>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Input type="text" name="name" placeholder={texts.users.name} value={formData.name} onChange={handleChange} required />
        <Input type="email" name="email" placeholder={texts.users.email} value={formData.email} onChange={handleChange} required />
        <Input type="password" name="password" placeholder={texts.users.password} value={formData.password} onChange={handleChange} required />
        <Input type="tel" name="phone" placeholder={texts.users.phone} value={formData.phone} onChange={handleChange} />

        <Select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">{texts.users.userRole}</option>
          <option value="admin">{texts.users.adminRole}</option>
          <option value="moderator">{texts.users.moderatorRole}</option>
          <option value="staff">{texts.users.staffRole}</option>
        </Select>

        <Select name="isActive" value={formData.isActive} onChange={handleChange}>
          <option value={true}>{texts.users.active}</option>
          <option value={false}>{texts.users.inactive}</option>
        </Select>

        <Input type="date" name="birthDate" placeholder={texts.users.birthDate} value={formData.birthDate} onChange={handleChange} />
        <Input type="text" name="bio" placeholder={texts.users.bio} value={formData.bio} onChange={handleChange} />

        <SectionTitle>{texts.users.addresses}</SectionTitle>
        {formData.addresses.map((address, index) => (
          <div key={index}>
            <Input type="text" name="street" placeholder="Street" value={address.street} onChange={(e) => handleAddressChange(index, e)} />
            <Input type="text" name="city" placeholder="City" value={address.city} onChange={(e) => handleAddressChange(index, e)} />
            <Input type="text" name="postalCode" placeholder="Postal Code" value={address.postalCode} onChange={(e) => handleAddressChange(index, e)} />
            <Input type="text" name="country" placeholder="Country" value={address.country} onChange={(e) => handleAddressChange(index, e)} />
          </div>
        ))}

        <SectionTitle>{texts.users.uploadProfileImage}</SectionTitle>
        <Input type="file" accept="image/*" onChange={handleImageUpload} />

        {formData.profileImage && (
          <ImagePreview src={URL.createObjectURL(formData.profileImage)} alt="Profile Preview" />
        )}

        <ActionButton type="submit" disabled={loading}>
          {loading ? texts.users.saving : texts.users.save}
        </ActionButton>
      </Form>
    </UsersContainer>
  );
};

export default AddUserForm;
