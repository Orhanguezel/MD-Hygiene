import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers,
  toggleUserStatus,
  deleteUser,
} from "@/features/users/userSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { toast } from "react-toastify";

import {
  UsersContainer,
  UserCard,
  UserImage,
  UserInfo,
  UserName,
  UserEmail,
  UserRole,
  UserStatus,
  ActionButton,
  AddUserButton,
  ResponsiveGrid,
} from "./styles/usersStyles";

// 📌 **Backend Base URL Tanımlandı**
const BASE_URL = "http://localhost:5010";

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { texts } = useLanguage();
  const { theme } = useTheme();

  const { users, loading, error } = useSelector((state) => state.users);
  const { token } = useSelector((state) => state.auth);

  const authToken = token || localStorage.getItem("token");

  useEffect(() => {
    if (authToken) {
      dispatch(getAllUsers({ token: authToken }));
    } else {
      toast.error("❌ Yetkilendirme hatası: Token bulunamadı!");
      navigate("/login");
    }
  }, [dispatch, authToken, navigate]);

  if (loading) return <p>{texts.users.loading}</p>;
  if (error) return <p>{texts.users.error}: {error}</p>;

  return (
    <UsersContainer theme={theme}>
      <h1>{texts.users.title}</h1>

      <AddUserButton onClick={() => navigate("/users/add")}>
        ➕ {texts.users.addUser}
      </AddUserButton>

      <ResponsiveGrid>
        {users.length > 0 ? (
          users.map(({ _id, name, email, role, profileImage, isActive }) => (
            <UserCard key={_id} theme={theme}>
              <UserImage
                src={
                  profileImage && profileImage.trim() !== ""
                    ? profileImage.startsWith("/uploads/profile-images/")
                      ? `${BASE_URL}${profileImage}` // ✅ **Base URL ekleme**
                      : profileImage
                    : "/default-avatar.png"
                }
                alt={name}
                onClick={() => navigate(`/users/${_id}`)}
                style={{ cursor: "pointer" }}
              />

              <UserInfo>
                <UserName theme={theme}>{name}</UserName>
                <UserEmail>{email}</UserEmail>
                <UserRole>{texts.users.role}: {role || "User"}</UserRole>
                <UserStatus $isActive={isActive}>
                  {isActive ? texts.users.active : texts.users.inactive}
                </UserStatus>

                <div>
                  <ActionButton theme={theme} onClick={() => navigate(`/users/${_id}`)}>
                    {texts.users.view}
                  </ActionButton>

                  <ActionButton theme={theme} onClick={() => navigate(`/users/edit/${_id}`)}>
                    {texts.users.edit}
                  </ActionButton>

                  <ActionButton
                    theme={theme}
                    onClick={() => {
                      dispatch(toggleUserStatus({ userId: String(_id), token: authToken }))
                        .unwrap()
                        .then(() => toast.success("✅ Kullanıcı durumu başarıyla güncellendi!"))
                        .catch((err) => toast.error(`⚠️ Hata: ${err}`));
                    }}
                  >
                    {isActive ? texts.users.deactivate : texts.users.activate}
                  </ActionButton>

                  <ActionButton
                    theme={theme}
                    onClick={() => {
                      dispatch(deleteUser({ userId: _id, token: authToken }))
                        .unwrap()
                        .then(() => toast.success("✅ Kullanıcı başarıyla silindi!"))
                        .catch((err) => toast.error(`❌ Kullanıcı silinemedi: ${err}`));
                    }}
                  >
                    {texts.users.delete}
                  </ActionButton>
                </div>
              </UserInfo>
            </UserCard>
          ))
        ) : (
          <p>{texts.users.noUsers}</p>
        )}
      </ResponsiveGrid>
    </UsersContainer>
  );
};

export default Users;
