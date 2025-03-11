import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserById, fetchUserFavorites } from "@/features/users/userSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";

import {
  UsersContainer,
  UserImage,
  InfoText,
  Label,
  SectionTitle,
  DetailsContainer,
  FavoritesList,
} from "../styles/usersStyles";

const UserDetails = () => {
  const { id } = useParams();
  const { texts } = useLanguage();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.selectedUser);

  useEffect(() => {
    dispatch(fetchUserById(id));
    dispatch(fetchUserFavorites(id));
  }, [dispatch, id]);

  if (!user) {
    return (
      <UsersContainer theme={theme}>
        <SectionTitle theme={theme}>{texts.users.details}</SectionTitle>
        <InfoText theme={theme}>{texts.users.notFound}</InfoText>
      </UsersContainer>
    );
  }

  return (
    <UsersContainer theme={theme}>
      <SectionTitle theme={theme}>{texts.users.details}</SectionTitle>

      <DetailsContainer theme={theme}>
        <UserImage src={user.profileImage || "/default-avatar.png"} alt={user.name} />
        <InfoText theme={theme}>
          <Label theme={theme}>{texts.users.name}:</Label> {user.name}
        </InfoText>
        <InfoText theme={theme}>
          <Label theme={theme}>{texts.users.email}:</Label> {user.email}
        </InfoText>
        <InfoText theme={theme}>
          <Label theme={theme}>{texts.users.role}:</Label> {user.role}
        </InfoText>

        {/* Kullanıcı Favorileri */}
        <FavoritesList theme={theme}>
          <h3>{texts.users.favorites}</h3>
          {user.favorites && user.favorites.length > 0 ? (
            <ul>
              {user.favorites.map((fav) => (
                <li key={fav.id}>{fav.title}</li>
              ))}
            </ul>
          ) : (
            <p>{texts.users.noFavorites}</p>
          )}
        </FavoritesList>
      </DetailsContainer>
    </UsersContainer>
  );
};

export default UserDetails;
