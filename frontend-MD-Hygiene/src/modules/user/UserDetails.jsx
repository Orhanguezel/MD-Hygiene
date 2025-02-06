import { useParams } from "react-router-dom";
import usersData from "../../data/users.json";
import { useLanguage } from "../../context/LanguageContext";
import { UsersContainer, UserImage } from "./usersStyles";

const UserDetails = () => {
  const { email } = useParams();
  const { texts } = useLanguage();

  // ✅ E-posta adresini decode et
  const decodedEmail = decodeURIComponent(email);

  // ✅ Kullanıcıyı email ile bul
  const user = usersData.find((u) => u.email === decodedEmail);

  // ✅ Kullanıcı bulunamazsa mesaj göster
  if (!user) {
    return (
      <UsersContainer>
        <h1>{texts.users.details}</h1>
        <p>{texts.users.notFound || "Kullanıcı bulunamadı!"}</p>
      </UsersContainer>
    );
  }

  return (
    <UsersContainer>
      <h1>{texts.users.details}</h1>
      <UserImage
        src={user.profileImage || "https://via.placeholder.com/150"}
        alt={user.name}
      />
      <p><strong>{texts.users.name}:</strong> {user.name}</p>
      <p><strong>{texts.users.email}:</strong> {user.email}</p>
      <p><strong>{texts.users.role}:</strong> {user.role}</p>
      <p><strong>{texts.users.phone}:</strong> {user.phone || "-"}</p>
      <p><strong>{texts.users.addresses}:</strong> 
        {user.addresses && user.addresses.length > 0
          ? user.addresses.join(", ")
          : "Adres bilgisi yok"}
      </p>
    </UsersContainer>
  );
};

export default UserDetails;
