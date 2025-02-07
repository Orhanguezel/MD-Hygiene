import { useEffect, useState, useContext } from "react";
import { FaEdit, FaTrash, FaPlus, FaUserShield } from "react-icons/fa";
import AuthContext from "../../context/AuthContext";
import { getAllUsers, createUser, updateUser, deleteUser } from "../../api/userApi";
import {
  Table,
  TableRow,
  TableHeader,
  TableData,
  ActionButton,
  FormContainer,
  Input,
  SubmitButton,
} from "../../styles/dashboardStyles";

const UserManagement = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "customer" });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers(user.token);
        setUsers(data);
      } catch (error) {
        console.error("Kullanıcılar alınamadı:", error);
      }
    };

    fetchUsers();
  }, [user]);

  const handleCreateUser = async () => {
    try {
      const createdUser = await createUser(newUser, user.token);
      setUsers([...users, createdUser]);
      setNewUser({ name: "", email: "", role: "customer" });
    } catch (error) {
      console.error("Kullanıcı eklenemedi:", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUser(editUser.id, editUser, user.token);
      setUsers(users.map((u) => (u.id === editUser.id ? editUser : u)));
      setEditUser(null);
    } catch (error) {
      console.error("Kullanıcı güncellenemedi:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId, user.token);
      setUsers(users.filter((u) => u.id !== userId));
    } catch (error) {
      console.error("Kullanıcı silinemedi:", error);
    }
  };

  return (
    <div>
      <h3>👤 Kullanıcı Yönetimi</h3>

      {/* 📌 Yeni Kullanıcı Ekleme Formu */}
      <FormContainer>
        <Input type="text" placeholder="Ad Soyad" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
        <Input type="email" placeholder="E-posta" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
        <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
          <option value="customer">Müşteri</option>
          <option value="admin">Admin</option>
        </select>
        <SubmitButton onClick={handleCreateUser}><FaPlus /> Ekle</SubmitButton>
      </FormContainer>

      {/* 📌 Kullanıcıları Listeleme */}
      <Table>
        <thead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Ad Soyad</TableHeader>
            <TableHeader>E-posta</TableHeader>
            <TableHeader>Rol</TableHeader>
            <TableHeader>İşlemler</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableData>{user.id}</TableData>
              <TableData>{user.name}</TableData>
              <TableData>{user.email}</TableData>
              <TableData>{user.role}</TableData>
              <TableData>
                <ActionButton onClick={() => setEditUser(user)}><FaEdit /> Düzenle</ActionButton>
                <ActionButton onClick={() => handleDeleteUser(user.id)}><FaTrash /> Sil</ActionButton>
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* 📌 Kullanıcı Güncelleme Formu */}
      {editUser && (
        <FormContainer>
          <Input type="text" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />
          <Input type="email" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
          <select value={editUser.role} onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}>
            <option value="customer">Müşteri</option>
            <option value="admin">Admin</option>
          </select>
          <SubmitButton onClick={handleUpdateUser}>Güncelle</SubmitButton>
        </FormContainer>
      )}
    </div>
  );
};

export default UserManagement;
