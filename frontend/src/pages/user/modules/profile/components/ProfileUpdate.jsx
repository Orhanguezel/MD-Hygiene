
// ✅ ProfileUpdate.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser} from "@/features/users/userSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { HomeContainer, FormContainer, Input, Button } from "../styles/profileStyles";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { texts } = useLanguage();
  const currentUser = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    surname: currentUser?.surname || "",
    email: currentUser?.email || "",
    password: "", // Güvenlik için şifreyi boş bırakıyoruz
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ ...currentUser, ...formData }));
    alert("✅ Profiliniz başarıyla güncellendi!");
    navigate("/profile");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <HomeContainer>
      <h1>{texts.users.title || "Profil Düzenle"}</h1>
      <FormContainer onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder={texts?.users?.name || "Adınız"}
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input
          type="text"
          name="surname"
          placeholder={texts?.users?.surname || "Soyadınız"}
          value={formData.surname}
          onChange={handleChange}
        />

        <Input
          type="email"
          name="email"
          placeholder={texts?.users?.email || "Email"}
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          type="password"
          name="password"
          placeholder={texts?.users?.password || "Şifre"}
          value={formData.password}
          onChange={handleChange}
        />

        <Button type="submit">{texts?.users?.save || "Kaydet"}</Button>
      </FormContainer>
    </HomeContainer>
  );
};

export default ProfileUpdate;
