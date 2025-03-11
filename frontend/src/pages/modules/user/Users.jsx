import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers,
  toggleUserStatus,
  deleteUser,
} from "@/features/users/userSlice"; // ✅ `authSlice` yerine `userSlice` kullanıldı
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { toast } from "react-toastify"; // ✅ Bildirim desteği eklendi

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

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { texts } = useLanguage();
  const { theme } = useTheme();

  // ✅ Redux store'dan kullanıcıları al
  const { users, loading, error } = useSelector((state) => state.users);
  const { token } = useSelector((state) => state.auth); // ✅ Token Redux'tan alındı

  // ✅ Token eksikse LocalStorage’dan al
  const authToken = token || localStorage.getItem("token");

  // ✅ Kullanıcıları yükle
  useEffect(() => {
    if (authToken) {
      dispatch(getAllUsers(authToken)); // ✅ Token ile kullanıcıları getir
    } else {
      toast.error("❌ Yetkilendirme hatası: Token bulunamadı!");
      navigate("/login"); // ✅ Yetkisizse giriş sayfasına at
    }
  }, [dispatch, authToken, navigate]);

  // ✅ Yükleme durumu
  if (loading) return <p>{texts.users.loading}</p>;

  // ✅ Hata mesajı
  if (error) return <p>{texts.users.error}: {error}</p>;

  return (
    <UsersContainer theme={theme}>
      <h1>{texts.users.title}</h1>

      {/* Kullanıcı ekleme butonu */}
      <AddUserButton onClick={() => navigate("/users/add")}>
        ➕ {texts.users.addUser}
      </AddUserButton>

      <ResponsiveGrid>
        {users.length > 0 ? (
          users.map(({ id, name, email, role, profileImage, isActive }) => (
            <UserCard key={id} theme={theme}>
              <UserImage src={profileImage || "/default-avatar.png"} alt={name} />
              <UserInfo>
                <UserName theme={theme}>{name}</UserName>
                <UserEmail>{email}</UserEmail>
                <UserRole>
                  {texts.users.role}: {role || "User"}
                </UserRole>
                <UserStatus $isActive={isActive}>
                  {isActive ? texts.users.active : texts.users.inactive}
                </UserStatus>

                <div>
                  {/* Kullanıcı detayına git */}
                  <ActionButton theme={theme} onClick={() => navigate(`/users/${id}`)}>
                    {texts.users.view}
                  </ActionButton>

                  {/* Kullanıcı düzenleme */}
                  <ActionButton theme={theme} onClick={() => navigate(`/users/edit/${id}`)}>
                    {texts.users.edit}
                  </ActionButton>

                  {/* Kullanıcı durumunu değiştir (Aktif/Pasif) */}
                  <ActionButton
                    theme={theme}
                    onClick={() => {
                      if (authToken) {
                        dispatch(toggleUserStatus({ id, token: authToken }));
                      } else {
                        toast.error("❌ Yetkilendirme hatası: Token bulunamadı!");
                      }
                    }}
                  >
                    {isActive ? texts.users.deactivate : texts.users.activate}
                  </ActionButton>

                  {/* Kullanıcıyı sil */}
                  <ActionButton
                    theme={theme}
                    onClick={() => {
                      if (authToken) {
                        dispatch(deleteUser({ id, token: authToken }));
                      } else {
                        toast.error("❌ Yetkilendirme hatası: Token bulunamadı!");
                      }
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
