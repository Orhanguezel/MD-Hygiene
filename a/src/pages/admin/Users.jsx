import { useEffect, useState } from "react";
import { FaUsers, FaEnvelope, FaUserShield } from "react-icons/fa";
import { API } from "../../services/api";
import {
  UsersContainer,
  UsersTable,
  TableHeader,
  TableRow,
  TableCell,
  LoadingMessage,
  ErrorMessage,
  TitleContainer,
  TitleIcon,
} from "../../styles/UsersStyles";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API.USERS);
        if (!response.ok) throw new Error("❌ Benutzer konnten nicht geladen werden!");

        const data = await response.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <UsersContainer>
      <TitleContainer>
        <TitleIcon>
          <FaUsers />
        </TitleIcon>
        <h1>Benutzerverwaltung</h1>
      </TitleContainer>

      {loading ? (
        <LoadingMessage>⏳ Daten werden geladen...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : users.length === 0 ? (
        <ErrorMessage>🚀 Keine Benutzer gefunden.</ErrorMessage>
      ) : (
        <UsersTable>
          <thead>
            <tr>
              <TableHeader>ID</TableHeader>
              <TableHeader>
                <FaUsers /> Name
              </TableHeader>
              <TableHeader>
                <FaEnvelope /> E-Mail
              </TableHeader>
              <TableHeader>
                <FaUserShield /> Rolle
              </TableHeader>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </UsersTable>
      )}
    </UsersContainer>
  );
};

export default Users;
