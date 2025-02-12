// ✅ Profile.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "@/features/users/userSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { HomeContainer, Button } from "./styles/profileStyles";

const Profile = () => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { texts } = useLanguage();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <HomeContainer>
      <h1>{texts.users.title || "Profil Bilgileri"}</h1>
      <p>Email: {state.user.email}</p>
      <p>Role: {state.user.role}</p>

      <p>
        {texts?.user?.hallo || "Hoşgeldiniz! Buradan tüm işlemlerinizi yönetebilirsiniz."}
      </p>

      <Link to={`/profile/${state.user.id}`}>
        <Button>Profil Düzenle</Button>
      </Link>
    </HomeContainer>
  );
};

export default Profile;