import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "@/features/reviews/reviewSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import {
  ReviewFormContainer,
  ReviewInput,
  SubmitButton,
  ReviewHeader,
  ProfileSection,
  UserAvatar,
  UserName,
  ReviewBox,
} from "../styles/ReviewStyles";
import { FaUserCircle } from "react-icons/fa"; 

const ReviewForm = () => {
  const { texts } = useLanguage();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [reviewText, setReviewText] = useState("");
  const [imageError, setImageError] = useState(false); // ✅ Resim yüklenemezse fallback için state

  console.log("Redux User Data:", user); // ✅ Konsolda user verisini kontrol et!

  if (!isAuthenticated) {
    return (
      <ReviewFormContainer theme={theme}>
        <p style={{ textAlign: "center", color: theme.text }}>
          🚫 {texts?.home?.onlyMembers || "Yorum yapmak için üye olmalısınız!"}
        </p>
      </ReviewFormContainer>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (reviewText.trim() === "") {
      toast.error(texts?.home?.emptyReview || "❌ Yorum boş olamaz!");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: user?.name || "Anonim Kullanıcı",
      feedback: reviewText,
      avatar: user?.profileImage && !imageError ? user.profileImage : "/default-avatar.png",
    };

    dispatch(addReview(newReview));
    setReviewText("");

    toast.success(texts?.home?.reviewSubmitted || "✅ Yorum başarıyla eklendi!");
  };

  return (
    <ReviewFormContainer theme={theme} onSubmit={handleSubmit}>
      {/* Kullanıcı Profili */}
      <ProfileSection>
        <UserAvatar
          src={!imageError ? user.profileImage : "/default-avatar.png"}
          alt={user.name}
          onError={() => setImageError(true)} // ✅ Resim yüklenemezse hata durumunu yönet
        />
        <UserName>{user?.name || "Anonim Kullanıcı"}</UserName>
      </ProfileSection>

      <ReviewHeader>{texts?.home?.writeReview || "Yorum Yap"}</ReviewHeader>

      <ReviewBox>
        <ReviewInput
          type="text"
          placeholder={texts?.home?.leaveReview || "Yorumunuzu buraya yazın..."}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          theme={theme}
        />
      </ReviewBox>

      <SubmitButton type="submit" theme={theme}>
        {texts?.home?.submitReview || "Gönder"}
      </SubmitButton>
    </ReviewFormContainer>
  );
};

export default ReviewForm;
