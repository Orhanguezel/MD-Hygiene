import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers,
  toggleUserStatus,
  deleteUser,
} from "@/features/users/userSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme"; // ✅ Tema Desteği

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
  const { texts } = useLanguage(); // ✅ Dil desteği
  const { theme } = useTheme(); // ✅ Tema desteği
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if (loading) return <p>{texts.users.loading}</p>;
  if (error)
    return (
      <p>
        {texts.users.error}: {error}
      </p>
    );

  return (
    <UsersContainer theme={theme}>
      <h1>{texts.users.title}</h1>

      <AddUserButton onClick={() => navigate("/users/add")}>
        ➕ {texts.users.addUser}
      </AddUserButton>

      <ResponsiveGrid>
        {users.map((user) => (
          <UserCard
            key={user.id}
            theme={theme}
            onClick={() => navigate(`/users/${user.id}`)}
          >
            <UserImage
              src={user.profileImage || "/default-avatar.png"}
              alt={user.name}
            />
            <UserInfo>
              <UserName theme={theme}>{user.name}</UserName>
              <UserEmail>{user.email}</UserEmail>
              <UserRole>
                {texts.users.role}: {user.role || "User"}
              </UserRole>
              <UserStatus $isActive={user.isActive}>
                {user.isActive ? texts.users.active : texts.users.inactive}
              </UserStatus>

              <div>
                <ActionButton
                  theme={theme}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/users/edit/${user.id}`);
                  }}
                >
                  {texts.users.edit}
                </ActionButton>

                <ActionButton
                  theme={theme}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleUserStatus(user.id));
                  }}
                >
                  {user.isActive
                    ? texts.users.deactivate
                    : texts.users.activate}
                </ActionButton>

                <ActionButton
                  theme={theme}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(deleteUser(user.id));
                  }}
                >
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
