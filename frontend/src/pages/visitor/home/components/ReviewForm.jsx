import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "@/features/reviews/reviewSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { toast } from "react-toastify"; // ✅ Bildirimler için import edildi
import "react-toastify/dist/ReactToastify.css";
import {
  ReviewFormContainer,
  ReviewInput,
  SubmitButton,
  ReviewHeader,
  ProfileSection,
  UserAvatar,
  UserName,
} from "../styles/ReviewStyles";

const ReviewForm = () => {
  const { texts } = useLanguage();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme); // ✅ Tema desteği
  const user = useSelector((state) => state.auth.user); // ✅ Kullanıcı bilgisi
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // ✅ Kullanıcı giriş yapmış mı?

  const [reviewText, setReviewText] = useState("");

  // 📌 Kullanıcı giriş yapmamışsa yorum yapmasına izin verme!
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
      id: Date.now(), // 📌 Geçici ID
      name: user?.name || "Anonim Kullanıcı",
      feedback: reviewText,
      avatar: user?.avatar || "https://randomuser.me/api/portraits/lego/5.jpg", // ✅ Kullanıcının avatarı varsa kullan
    };

    dispatch(addReview(newReview));
    setReviewText(""); // 📌 Formu temizle

    toast.success(texts?.home?.reviewSubmitted || "✅ Yorum başarıyla eklendi!");
  };

  return (
    <ReviewFormContainer theme={theme} onSubmit={handleSubmit}>
      {/* 📌 Kullanıcı Profili */}
      <ProfileSection>
        <UserAvatar src={user?.avatar || "https://randomuser.me/api/portraits/lego/5.jpg"} />
        <UserName>{user?.name || "Anonim Kullanıcı"}</UserName>
      </ProfileSection>

      <ReviewHeader>{texts?.home?.writeReview || "Yorum Yap"}</ReviewHeader>

      <ReviewInput
        type="text"
        placeholder={texts?.home?.leaveReview || "Yorumunuzu buraya yazın..."}
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        theme={theme}
      />

      <SubmitButton type="submit" theme={theme}>
        {texts?.home?.submitReview || "Gönder"}
      </SubmitButton>
    </ReviewFormContainer>
  );
};

export default ReviewForm;
