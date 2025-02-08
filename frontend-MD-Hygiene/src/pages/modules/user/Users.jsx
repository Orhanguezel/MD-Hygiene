// ✅ Users.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import dummyUsers from "./data/users.json";
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
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(dummyUsers); // ✅ Dummy verileri yükle
  }, []);

  const handleDelete = (userId, e) => {
    e.stopPropagation();
    setUsers(users.filter((user) => user.id !== userId)); // ✅ Kullanıcıyı sil
  };

  const handleToggleStatus = (userId, currentStatus, e) => {
    e.stopPropagation();
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isActive: !currentStatus } : user
      )
    ); // ✅ Aktif/Pasif durumu güncelle
  };

  return (
    <UsersContainer>
      <h1>{texts.users.title}</h1>
      <AddUserButton onClick={() => navigate("/users/add")}>➕ {texts.users.addUser}</AddUserButton>
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
            <tr key={user.id} onClick={() => navigate(`/users/${user.id}`)}>
              <Td>
                <UserImage src={user.profileImage || "/default-avatar.png"} alt={user.name} />
              </Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>{user.isActive ? texts.users.active : texts.users.inactive}</Td>
              <Td>
                <ActionButton onClick={(e) => navigate(`/users/edit/${user.id}`)}>{texts.users.edit}</ActionButton>
                <ActionButton onClick={(e) => handleDelete(user.id, e)}>{texts.users.delete}</ActionButton>
                <ActionButton onClick={(e) => handleToggleStatus(user.id, user.isActive, e)}>
                  {user.isActive ? texts.users.deactivate : texts.users.activate}
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
