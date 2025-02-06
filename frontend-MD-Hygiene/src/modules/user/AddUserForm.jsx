import { useLanguage } from "../../context/LanguageContext";
import { UsersContainer, ActionButton } from "./usersStyles";

const AddUserForm = () => {
  const { texts } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Yeni kullanıcı eklendi.");
  };

  return (
    <UsersContainer>
      <h1>{texts.users.addUser}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder={texts.users.name} required />
        <input type="email" placeholder={texts.users.email} required />
        <input type="password" placeholder={texts.users.password} required />
        <ActionButton type="submit">{texts.users.save}</ActionButton>
      </form>
    </UsersContainer>
  );
};

export default AddUserForm;
