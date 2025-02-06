import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { UsersContainer, Table, Th, Td, ActionButton, UserImage, AddUserButton } from "./usersStyles";
import usersData from "../../data/users.json"; 

const Users = () => {
  const { texts } = useLanguage();
  const navigate = useNavigate();

  const handleDelete = (email, e) => {
    e.stopPropagation();
    console.log(`Kullanıcı ${email} silindi.`);
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
            <Th>{texts.users.actions}</Th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <tr key={user.email} onClick={() => navigate(`/users/${encodeURIComponent(user.email)}`)}>
              <Td>
                <UserImage src={user.profileImage} alt={user.name} />
              </Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>
                <ActionButton
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/users/edit/${encodeURIComponent(user.email)}`);
                  }}
                >
                  {texts.users.edit}
                </ActionButton>
                <ActionButton
                  onClick={(e) => handleDelete(user.email, e)}
                >
                  {texts.users.delete}
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

