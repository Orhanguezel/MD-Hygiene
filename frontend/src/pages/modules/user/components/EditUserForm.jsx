import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, updateUser } from "@/features/users/userSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { toast } from "react-toastify";
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

const BASE_URL = "http://localhost:5010"; // ✅ Backend'in çalıştığı adres
const DEFAULT_AVATAR = "/default-avatar.png"; // ✅ Varsayılan avatar

const EditUserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { texts } = useLanguage();

  const { selectedUser: user, loading, error } = useSelector((state) => state.users);
  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    isActive: true,
    phone: "",
    profileImage: DEFAULT_AVATAR, // ✅ Varsayılan profil resmi
    newProfileImage: null, // ✅ Yüklenen resim burada tutulacak
    bio: "",
    birthDate: "",
    addresses: [{ street: "", city: "", postalCode: "", country: "", isDefault: false }],
    socialMedia: { facebook: "", twitter: "", instagram: "" },
    notifications: { emailNotifications: true, smsNotifications: false },
  });

  // ✅ **Kullanıcının Mevcut Bilgilerini Getir**
  useEffect(() => {
    if (token) {
      dispatch(fetchUserById(id));
    } else {
      navigate("/login");
    }
  }, [dispatch, id, token, navigate]);

  // ✅ **Formu Güncelle (Kullanıcı Bilgileri Geldiğinde)**
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "user",
        isActive: user.isActive ?? true,
        phone: user.phone || "",
        profileImage: user.profileImage || DEFAULT_AVATAR,
        newProfileImage: null,
        bio: user.bio || "",
        birthDate: user.birthDate ? user.birthDate.split("T")[0] : "",
        addresses: Array.isArray(user.addresses) && user.addresses.length > 0
          ? user.addresses.map(addr => ({
              street: addr.street || "",
              city: addr.city || "",
              postalCode: addr.postalCode || "",
              country: addr.country || "",
              isDefault: addr.isDefault ?? false,
            }))
          : [{ street: "", city: "", postalCode: "", country: "", isDefault: false }],
        socialMedia: user.socialMedia || { facebook: "", twitter: "", instagram: "" },
        notifications: user.notifications || { emailNotifications: true, smsNotifications: false },
      });
    }
  }, [user]);

  // 📌 **Form Alanlarını Güncelleme**
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value || "" });
  };

  // 📌 **Adres Güncelleme**
  const handleAddressChange = (index, e) => {
    const newAddresses = [...formData.addresses];
    newAddresses[index][e.target.name] = e.target.value || "";
    setFormData({ ...formData, addresses: newAddresses });
  };

// Profil resmi yükleme fonksiyonunu düzgün ayarla:
// 📌 **Profil Resmi Yükleme**
const handleImageUpload = (e) => {
  const file = e.target.files[0];

  if (file && file.type.startsWith("image/")) {
    setFormData((prev) => ({
      ...prev,
      newProfileImage: file, // Yeni yüklenen dosya
      profileImage: URL.createObjectURL(file), // Önizleme
    }));
  } else {
    toast.error("❌ Geçerli bir resim dosyası yükleyin.");
  }
};

// 📌 **Kullanıcı Güncelleme İşlemi**
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const updateData = new FormData();
    updateData.append("name", formData.name);
    updateData.append("email", formData.email);
    updateData.append("role", formData.role);
    updateData.append("isActive", formData.isActive);
    updateData.append("phone", formData.phone);
    updateData.append("bio", formData.bio);
    updateData.append("birthDate", formData.birthDate);
    updateData.append("socialMedia", JSON.stringify(formData.socialMedia));
    updateData.append("notifications", JSON.stringify(formData.notifications));
    updateData.append("addresses", JSON.stringify(formData.addresses));

    if (formData.newProfileImage && formData.newProfileImage instanceof File) {
      updateData.append("profileImage", formData.newProfileImage);
    }

    if (user.profileImage) {
      updateData.append("oldProfileImage", user.profileImage);
    }

    await dispatch(updateUser({ userId: id, userData: updateData })).unwrap();
    toast.success("✅ Kullanıcı başarıyla güncellendi!");
    navigate("/users");
  } catch (err) {
    console.error("❌ Kullanıcı güncelleme hatası:", err);
  }
};


  return (
    <UsersContainer>
      <SectionTitle>{texts.users.editUser}</SectionTitle>
  
      {error && <ErrorMessage>{error}</ErrorMessage>}
  
      <Form onSubmit={handleSubmit}>
        {/* ✅ Kullanıcı Adı */}
        <Input
          type="text"
          name="name"
          placeholder={texts.users.name}
          value={formData.name || ""}
          onChange={handleChange}
          required
        />
  
        {/* ✅ E-posta (Değiştirilemez) */}
        <Input
          type="email"
          name="email"
          placeholder={texts.users.email}
          value={formData.email || ""}
          disabled
        />
  
        {/* ✅ Telefon Numarası */}
        <Input
          type="tel"
          name="phone"
          placeholder={texts.users.phone}
          value={formData.phone || ""}
          onChange={handleChange}
        />
  
        {/* ✅ Kullanıcı Rolü */}
        <Select name="role" value={formData.role || "user"} onChange={handleChange}>
          <option value="user">{texts.users.userRole}</option>
          <option value="admin">{texts.users.adminRole}</option>
          <option value="moderator">{texts.users.moderatorRole}</option>
          <option value="staff">{texts.users.staffRole}</option>
        </Select>
  
        {/* ✅ Kullanıcı Durumu */}
        <Select name="isActive" value={formData.isActive ?? true} onChange={handleChange}>
          <option value={true}>{texts.users.active}</option>
          <option value={false}>{texts.users.inactive}</option>
        </Select>
  
        {/* ✅ Doğum Tarihi */}
        <Input
          type="date"
          name="birthDate"
          placeholder={texts.users.birthDate}
          value={formData.birthDate || ""}
          onChange={handleChange}
        />
  
        {/* ✅ Bio */}
        <Input
          type="text"
          name="bio"
          placeholder={texts.users.bio}
          value={formData.bio || ""}
          onChange={handleChange}
        />
  
        {/* ✅ Adresler */}
        <SectionTitle>{texts.users.addresses}</SectionTitle>
        {formData.addresses.map((address, index) => (
          <div key={index}>
            <Input
              type="text"
              name="street"
              placeholder="Street"
              value={address.street || ""}
              onChange={(e) => handleAddressChange(index, e)}
            />
            <Input
              type="text"
              name="city"
              placeholder="City"
              value={address.city || ""}
              onChange={(e) => handleAddressChange(index, e)}
            />
            <Input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={address.postalCode || ""}
              onChange={(e) => handleAddressChange(index, e)}
            />
            <Input
              type="text"
              name="country"
              placeholder="Country"
              value={address.country || ""}
              onChange={(e) => handleAddressChange(index, e)}
            />
          </div>
        ))}
  
        {/* ✅ Sosyal Medya Bağlantıları */}
        <SectionTitle>{texts.users.socialMedia}</SectionTitle>
        <Input
          type="text"
          name="facebook"
          placeholder="Facebook"
          value={formData.socialMedia.facebook || ""}
          onChange={(e) => setFormData({
            ...formData,
            socialMedia: { ...formData.socialMedia, facebook: e.target.value },
          })}
        />
        <Input
          type="text"
          name="twitter"
          placeholder="Twitter"
          value={formData.socialMedia.twitter || ""}
          onChange={(e) => setFormData({
            ...formData,
            socialMedia: { ...formData.socialMedia, twitter: e.target.value },
          })}
        />
        <Input
          type="text"
          name="instagram"
          placeholder="Instagram"
          value={formData.socialMedia.instagram || ""}
          onChange={(e) => setFormData({
            ...formData,
            socialMedia: { ...formData.socialMedia, instagram: e.target.value },
          })}
        />
  
        {/* 📌 **Profil Resmi Yükleme Alanı** */}
        <SectionTitle>{texts.users.uploadProfileImage}</SectionTitle>
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
  
        {/* ✅ **Profil Resmi Önizleme** */}
        {formData.profileImage && (
          <ImagePreview
            src={
              formData.newProfileImage
                ? URL.createObjectURL(formData.newProfileImage)
                : formData.profileImage.startsWith("/uploads/")
                ? `${BASE_URL}${formData.profileImage}`
                : formData.profileImage
            }
            alt="Profile Preview"
          />
        )}
  
        {/* 📌 **Güncelle Butonu** */}
        <ActionButton type="submit">
          {texts.users.saveChanges}
        </ActionButton>
      </Form>
    </UsersContainer>
  );
}  

export default EditUserForm;
