// ✅ UserDetails.js
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import users from "../data/users.json";
import { UsersContainer, UserImage } from "../styles/usersStyles";

const UserDetails = () => {
  const { id } = useParams();
  const { texts } = useLanguage();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const foundUser = users.find((u) => u.id === id);
    setUser(foundUser);
  }, [id]);

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
      <UserImage src={user.profileImage || "https://via.placeholder.com/150"} alt={user.name} />
      <p><strong>{texts.users.name}:</strong> {user.name}</p>
      <p><strong>{texts.users.email}:</strong> {user.email}</p>
      <p><strong>{texts.users.role}:</strong> {user.role}</p>
      <p><strong>{texts.users.phone}:</strong> {user.phone || "-"}</p>
      <p><strong>{texts.users.addresses}:</strong> {user.addresses && user.addresses.length > 0
          ? user.addresses.map((address) => `${address.street}, ${address.city}, ${address.country}`).join(", ")
          : texts.users.noAddress}
      </p>
    </UsersContainer>
  );
};

export default UserDetails;
