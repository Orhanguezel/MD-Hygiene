import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, toggleUserStatus } from "@/features/auth/authSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { toggleTheme } from "@/features/theme/themeSlice"; // ✅ Tema toggle

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
  const users = useSelector((state) => state.auth.users);
  const themeMode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleToggleStatus = (userId, currentStatus, e) => {
    e.stopPropagation();
    dispatch(toggleUserStatus({ userId, currentStatus: !currentStatus }));
  };

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
              <UserRole>{texts.users.role}: {user.role}</UserRole>
              <UserStatus isActive={user.isActive}>
                {user.isActive ? texts.users.active : texts.users.inactive}
              </UserStatus>
              <div>
                <ActionButton onClick={(e) => { e.stopPropagation(); navigate(`/users/edit/${user.id}`); }}>
                  {texts.users.edit}
                </ActionButton>
                <ActionButton
                  onClick={(e) => handleToggleStatus(user.id, user.isActive, e)}
                >
                  {user.isActive ? texts.users.deactivate : texts.users.activate}
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
