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

  // ✅ Redux store'dan kullanıcıyı al
  const { selectedUser: user, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserById(id)); // ✅ Kullanıcı bilgilerini getir
    dispatch(fetchUserFavorites(id)); // ✅ Kullanıcının favori ürünlerini getir
  }, [dispatch, id]);

  // ✅ Yüklenme durumu
  if (loading) {
    return (
      <UsersContainer theme={theme}>
        <SectionTitle theme={theme}>{texts.users.details}</SectionTitle>
        <InfoText theme={theme}>{texts.users.loading}</InfoText>
      </UsersContainer>
    );
  }

  // ✅ Hata durumu
  if (error) {
    return (
      <UsersContainer theme={theme}>
        <SectionTitle theme={theme}>{texts.users.details}</SectionTitle>
        <InfoText theme={theme} style={{ color: "red" }}>
          {texts.users.error}: {error}
        </InfoText>
      </UsersContainer>
    );
  }

  // ✅ Kullanıcı bulunamazsa
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
        {/* ✅ Profil resmi düzeltildi */}
        <UserImage 
          src={user.profileImage && user.profileImage.trim() !== "" 
                ? user.profileImage 
                : "/default-avatar.png"} 
          alt={user.name} 
        />

        <InfoText theme={theme}>
          <Label theme={theme}>{texts.users.name}:</Label> {user.name}
        </InfoText>
        <InfoText theme={theme}>
          <Label theme={theme}>{texts.users.email}:</Label> {user.email}
        </InfoText>
        <InfoText theme={theme}>
          <Label theme={theme}>{texts.users.role}:</Label> {user.role}
        </InfoText>
        <InfoText theme={theme}>
          <Label theme={theme}>{texts.users.phone}:</Label> {user.phone || "—"}
        </InfoText>
        <InfoText theme={theme}>
          <Label theme={theme}>{texts.users.birthDate}:</Label> {user.birthDate ? new Date(user.birthDate).toLocaleDateString() : "—"}
        </InfoText>
        <InfoText theme={theme}>
          <Label theme={theme}>{texts.users.bio}:</Label> {user.bio || "—"}
        </InfoText>

        {/* ✅ Adresler */}
        <InfoText theme={theme}>
          <Label theme={theme}>{texts.users.addresses}:</Label>
        </InfoText>
        {user.addresses && user.addresses.length > 0 ? (
          user.addresses.map((address, index) => (
            <InfoText key={index} theme={theme}>
              📍 {address.street}, {address.city}, {address.country}
            </InfoText>
          ))
        ) : (
          <InfoText theme={theme}>{texts.users.noAddresses}</InfoText>
        )}

        {/* ✅ Sosyal Medya */}
        <InfoText theme={theme}>
          <Label theme={theme}>{texts.users.socialMedia}:</Label>
        </InfoText>
        {user.socialMedia && (
          <>
            {user.socialMedia.facebook && <InfoText>🌐 Facebook: {user.socialMedia.facebook}</InfoText>}
            {user.socialMedia.twitter && <InfoText>🐦 Twitter: {user.socialMedia.twitter}</InfoText>}
            {user.socialMedia.instagram && <InfoText>📸 Instagram: {user.socialMedia.instagram}</InfoText>}
          </>
        )}

        {/* ✅ Bildirim Ayarları */}
        <InfoText theme={theme}>
          <Label theme={theme}>{texts.users.notifications}:</Label>
        </InfoText>
        <InfoText theme={theme}>
          {texts.users.emailNotifications}: {user.notifications?.emailNotifications ? "✅ Açık" : "❌ Kapalı"}
        </InfoText>
        <InfoText theme={theme}>
          {texts.users.smsNotifications}: {user.notifications?.smsNotifications ? "✅ Açık" : "❌ Kapalı"}
        </InfoText>

        {/* ✅ Kullanıcı Favorileri (favorites) */}
        <FavoritesList theme={theme}>
          <h3>{texts.users.favorites}</h3>
          {user.favorites && user.favorites.length > 0 ? (
            <ul>
              {user.favorites.map((fav) => (
                <li key={fav._id}>{fav.title || texts.users.unknownItem}</li>
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
