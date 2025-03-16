import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/features/users/userSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { toast } from "react-toastify";
import {
  HomeContainer,
  FormContainer,
  Input,
  Button,
  ProfileImageContainer,
  ProfileImage,
  FileInput,
  TextArea
} from "../styles/profileStyles";

const BASE_URL = "http://localhost:5010"; // ✅ Backend'in çalıştığı adres

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { texts } = useLanguage();
  const { theme } = useTheme();
  const currentUser = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    birthDate: currentUser?.birthDate ? new Date(currentUser.birthDate).toISOString().split("T")[0] : "",
    bio: currentUser?.bio || "",
    profileImage: currentUser?.profileImage || "/default-avatar.png",
    newProfileImage: null,
    socialMedia: {
      facebook: currentUser?.socialMedia?.facebook || "",
      twitter: currentUser?.socialMedia?.twitter || "",
      instagram: currentUser?.socialMedia?.instagram || "",
    },
    addresses: currentUser?.addresses || [{ street: "", city: "", postalCode: "", country: "", isDefault: false }],
    password: "", // Güvenlik için şifreyi boş bırakıyoruz
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateData = { ...currentUser, ...formData };
    if (!formData.password) delete updateData.password;

    dispatch(updateUser(updateData))
      .unwrap()
      .then(() => {
        toast.success(texts.profile.updateSuccess || "✅ Profil başarıyla güncellendi!");
        navigate("/profile");
      })
      .catch((error) => {
        toast.error(texts.profile.updateError || "❌ Profil güncellenirken hata oluştu!");
        console.error(error);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...formData.addresses];
    updatedAddresses[index][field] = value;
    setFormData({ ...formData, addresses: updatedAddresses });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        newProfileImage: file,
        profileImage: URL.createObjectURL(file), // Önizleme için
      });
    }
  };

  // ✅ **Profil Resmini Doğru Gösterme**
  const imageSrc =
    formData.profileImage.startsWith("/uploads/")
      ? `${BASE_URL}${formData.profileImage}`
      : formData.profileImage.startsWith("http")
      ? formData.profileImage
      : "/default-avatar.png";

  return (
    <HomeContainer theme={theme}>
      <h1>{texts.profile.editProfile || "Profil Güncelle"}</h1>
      <FormContainer onSubmit={handleSubmit} theme={theme}>
        
        {/* ✅ Profil Resmi Önizleme */}
        <ProfileImageContainer>
          <ProfileImage src={imageSrc} alt="Profile" />
          <FileInput type="file" accept="image/*" onChange={handleImageUpload} />
        </ProfileImageContainer>

        <Input type="text" name="name" placeholder={texts.profile.name} value={formData.name} onChange={handleChange} required />
        <Input type="email" name="email" placeholder={texts.profile.email} value={formData.email} onChange={handleChange} required />
        <Input type="text" name="phone" placeholder={texts.profile.phone} value={formData.phone} onChange={handleChange} />
        <Input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
        <TextArea name="bio" placeholder={texts.profile.bio} value={formData.bio} onChange={handleChange} />

        {/* ✅ Adresler */}
        {formData.addresses.map((address, index) => (
          <div key={index}>
            <Input type="text" placeholder={texts.profile.street} value={address.street} onChange={(e) => handleAddressChange(index, "street", e.target.value)} />
            <Input type="text" placeholder={texts.profile.city} value={address.city} onChange={(e) => handleAddressChange(index, "city", e.target.value)} />
            <Input type="text" placeholder={texts.profile.postalCode} value={address.postalCode} onChange={(e) => handleAddressChange(index, "postalCode", e.target.value)} />
            <Input type="text" placeholder={texts.profile.country} value={address.country} onChange={(e) => handleAddressChange(index, "country", e.target.value)} />
          </div>
        ))}

        {/* ✅ Sosyal Medya */}
        <Input type="text" name="facebook" placeholder="Facebook" value={formData.socialMedia.facebook} onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, facebook: e.target.value } })} />
        <Input type="text" name="twitter" placeholder="Twitter" value={formData.socialMedia.twitter} onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, twitter: e.target.value } })} />
        <Input type="text" name="instagram" placeholder="Instagram" value={formData.socialMedia.instagram} onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, instagram: e.target.value } })} />

        <Input type="password" name="password" placeholder={texts.profile.password} value={formData.password} onChange={handleChange} />

        <Button type="submit" theme={theme}>{texts.profile.save}</Button>
      </FormContainer>
    </HomeContainer>
  );
};

export default ProfileUpdate;
