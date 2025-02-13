import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/features/users/userSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { HomeContainer, FormContainer, Input, Button } from "../styles/profileStyles";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { texts } = useLanguage();
  const { theme } = useTheme();
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
    alert(texts.profile.updateSuccess);
    navigate("/profile");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <HomeContainer theme={theme}>
      <h1>{texts.profile.editProfile}</h1>
      <FormContainer onSubmit={handleSubmit} theme={theme}>
        <Input
          type="text"
          name="name"
          placeholder={texts.profile.name}
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input
          type="text"
          name="surname"
          placeholder={texts.profile.surname}
          value={formData.surname}
          onChange={handleChange}
        />

        <Input
          type="email"
          name="email"
          placeholder={texts.profile.email}
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          type="password"
          name="password"
          placeholder={texts.profile.password}
          value={formData.password}
          onChange={handleChange}
        />

        <Button type="submit" theme={theme}>{texts.profile.save}</Button>
      </FormContainer>
    </HomeContainer>
  );
};

export default ProfileUpdate;
