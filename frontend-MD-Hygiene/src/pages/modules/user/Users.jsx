import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, toggleUserStatus } from "@/features/auth/authSlice";
import {
  UsersContainer,
  Table,
  Th,
  Td,
  ActionButton,
  UserImage,
  AddUserButton,
} from "./styles/usersStyles";

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { texts } = useSelector((state) => state.settings);
  const users = useSelector((state) => state.auth.users); // ✅ RTK'den kullanıcıları çekiyoruz

  useEffect(() => {
    dispatch(fetchUsers()); // ✅ Kullanıcıları JSON'dan yükle
  }, [dispatch]);

  const handleToggleStatus = (userId, currentStatus, e) => {
    e.stopPropagation();
    dispatch(toggleUserStatus({ userId, currentStatus: !currentStatus })); // ✅ Aktif/Pasif durumu değiştir
  };

  return (
    <UsersContainer>
      <h1>{texts?.users?.title || "Kullanıcı Yönetimi"}</h1>
      <AddUserButton onClick={() => navigate("/users/add")}>
        ➕ {texts?.users?.addUser || "Yeni Kullanıcı Ekle"}
      </AddUserButton>
      <Table>
        <thead>
          <tr>
            <Th>{texts?.users?.avatar || "Profil"}</Th>
            <Th>{texts?.users?.name || "Ad Soyad"}</Th>
            <Th>{texts?.users?.email || "E-posta"}</Th>
            <Th>{texts?.users?.role || "Rol"}</Th>
            <Th>{texts?.users?.status || "Durum"}</Th>
            <Th>{texts?.users?.actions || "İşlemler"}</Th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} onClick={() => navigate(`/users/${user.id}`)}>
              <Td>
                <UserImage
                  src={user.profileImage || "/default-avatar.png"}
                  alt={user.name}
                />
              </Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>
                {user.isActive
                  ? texts?.users?.active || "Aktif"
                  : texts?.users?.inactive || "Pasif"}
              </Td>
              <Td>
                <ActionButton onClick={(e) => navigate(`/users/edit/${user.id}`)}>
                  {texts?.users?.edit || "Düzenle"}
                </ActionButton>
                <ActionButton
                  onClick={(e) => handleToggleStatus(user.id, user.isActive, e)}
                >
                  {user.isActive
                    ? texts?.users?.deactivate || "Devre Dışı Bırak"
                    : texts?.users?.activate || "Aktif Et"}
                </ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </UsersContainer>
  );
};

export default Users;
