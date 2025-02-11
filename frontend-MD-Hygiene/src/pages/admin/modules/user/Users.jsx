import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, addUser, updateUser, deleteUser, toggleUserStatus } from '@/features/users/userSlice';
import { useLanguage } from "@/features/language/useLanguage";

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
  const { users, loading, error } = useSelector((state) => state.user);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Kullanıcı Ekleme
  const handleAddUser = (e) => {
    e.preventDefault();
    if (newUser.name && newUser.email) {
      dispatch(addUser(newUser));
      setNewUser({ name: '', email: '' });
    }
  };

  // Kullanıcı Güncelleme
  const handleUpdateUser = (e) => {
    e.preventDefault();
    dispatch(updateUser(editUser));
    setEditUser(null);
  };

  // Kullanıcı Silme
  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  // Aktif/Pasif Durumunu Değiştirme
  const handleToggleStatus = (userId, isActive, event) => {
    event.stopPropagation(); // Kart tıklamasını engellemek için
    dispatch(toggleUserStatus(userId));
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <UsersContainer>
      <h1>{texts.users.title}</h1>

      <AddUserButton onClick={() => navigate("/users/add")}>
        ➕ {texts.users.addUser}
      </AddUserButton>

      <ResponsiveGrid>
        {users.map((user) => (
          <UserCard key={user.id} onClick={() => navigate(`/users/${user.id}`)}>
            <UserImage src={user.profileImage || "/default-avatar.png"} alt={user.name} />
            <UserInfo>
              <UserName>{user.name}</UserName>
              <UserEmail>{user.email}</UserEmail>
              <UserRole>{texts.users.role}: {user.role || 'User'}</UserRole>
              <UserStatus isActive={user.isActive}>
                {user.isActive ? texts.users.active : texts.users.inactive}
              </UserStatus>

              <div>
                <ActionButton onClick={(e) => { e.stopPropagation(); navigate(`/users/edit/${user.id}`); }}>
                  {texts.users.edit}
                </ActionButton>

                <ActionButton onClick={(e) => handleToggleStatus(user.id, user.isActive, e)}>
                  {user.isActive ? texts.users.deactivate : texts.users.activate}
                </ActionButton>

                <ActionButton onClick={(e) => { e.stopPropagation(); handleDelete(user.id); }}>
                  {texts.users.delete}
                </ActionButton>
              </div>
            </UserInfo>
          </UserCard>
        ))}
      </ResponsiveGrid>
    </UsersContainer>
  );
};

export default Users;
