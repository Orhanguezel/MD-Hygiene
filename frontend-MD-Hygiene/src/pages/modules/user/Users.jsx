// ✅ Users.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { getUsers, deleteUser, toggleUserStatus } from "@/api/userApi";
import { useAuth } from "@/context/AuthContext";
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
  const { texts } = useLanguage();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (token) {
      getUsers(token)
        .then(setUsers)
        .catch((error) => console.error("Error fetching users:", error));
    }
  }, [token]);

  const handleDelete = async (userId, e) => {
    e.stopPropagation();
    try {
      await deleteUser(userId, token);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleToggleStatus = async (userId, currentStatus, e) => {
    e.stopPropagation();
    try {
      await toggleUserStatus(userId, !currentStatus, token);
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isActive: !currentStatus } : user
        )
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  return (
    <UsersContainer>
      <h1>{texts.users.title}</h1>
      <AddUserButton onClick={() => navigate("/users/add")}>
        ➕ {texts.users.addUser}
      </AddUserButton>

      <Table>
        <thead>
          <tr>
            <Th>{texts.users.avatar}</Th>
            <Th>{texts.users.name}</Th>
            <Th>{texts.users.email}</Th>
            <Th>{texts.users.role}</Th>
            <Th>{texts.users.status}</Th>
            <Th>{texts.users.actions}</Th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} onClick={() => navigate(`/users/${user._id}`)}>
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
                {user.isActive ? texts.users.active : texts.users.inactive}
              </Td>
              <Td>
                <ActionButton
                  onClick={(e) => navigate(`/users/edit/${user._id}`)}
                >
                  {texts.users.edit}
                </ActionButton>
                <ActionButton onClick={(e) => handleDelete(user._id, e)}>
                  {texts.users.delete}
                </ActionButton>
                <ActionButton
                  onClick={(e) =>
                    handleToggleStatus(user._id, user.isActive, e)
                  }
                >
                  {user.isActive
                    ? texts.users.deactivate
                    : texts.users.activate}
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
