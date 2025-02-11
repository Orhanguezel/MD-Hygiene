import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLanguage } from "@/features/language/useLanguage";
import { toggleTheme } from "@/features/theme/themeSlice";
import {
  UsersContainer,
  UserImage,
  InfoText,
  Label,
  SectionTitle,
  DetailsContainer,
  ActionButton,
} from "../styles/usersStyles";

const UserDetails = () => {
  const { id } = useParams();
  const { texts } = useLanguage();
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return (
      <UsersContainer>
        <SectionTitle>{texts.users.details}</SectionTitle>
        <InfoText>{texts.users.notFound}</InfoText>
        <ActionButton onClick={() => dispatch(toggleTheme())}>
          {themeMode === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </ActionButton>
      </UsersContainer>
    );
  }

  return (
    <UsersContainer>
      <SectionTitle>{texts.users.details}</SectionTitle>
      <ActionButton onClick={() => dispatch(toggleTheme())}>
        {themeMode === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </ActionButton>

      <DetailsContainer>
        <UserImage
          src={user.profileImage || "https://via.placeholder.com/150"}
          alt={user.name}
        />
        <InfoText>
          <Label>{texts.users.name}:</Label> {user.name}
        </InfoText>
        <InfoText>
          <Label>{texts.users.email}:</Label> {user.email}
        </InfoText>
        <InfoText>
          <Label>{texts.users.role}:</Label> {user.role}
        </InfoText>
        <InfoText>
          <Label>{texts.users.phone}:</Label> {user.phone || "-"}
        </InfoText>
        <InfoText>
          <Label>{texts.users.addresses}:</Label>
          {user.addresses && user.addresses.length > 0
            ? user.addresses
                .map(
                  (address) =>
                    `${address.street}, ${address.city}, ${address.country}`
                )
                .join(", ")
            : texts.users.noAddress}
        </InfoText>
      </DetailsContainer>
    </UsersContainer>
  );
};

export default UserDetails;
