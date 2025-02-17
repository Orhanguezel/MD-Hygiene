import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, addReview, deleteReview } from "@/features/reviews/reviewSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TestimonialsContainer,
  TestimonialCard,
  Avatar,
  CustomerName,
  Feedback,
  ReviewForm,
  ReviewInput,
  SubmitButton,
  DeleteButton,
  ShowMoreButton, // ✅ Renk düzenlendi ve korunuyor
} from "../styles/TestimonialsStyles";

const Testimonials = () => {
  const dispatch = useDispatch();
  const { texts } = useLanguage();
  const theme = useSelector((state) => state.theme);
  const { reviews, loading, error } = useSelector((state) => state.review);
  const user = useSelector((state) => state.auth.user);
  const [newReview, setNewReview] = useState("");
  const [visibleReviews, setVisibleReviews] = useState(5); // ✅ İlk başta 5 yorum göster

  useEffect(() => {
    dispatch(fetchReviews()); // ✅ Redux Store’dan yorumları çek
  }, [dispatch]);

  const handleAddReview = () => {
    if (!user) {
      toast.error(texts.home.authRequired || "❌ Yorum ekleyebilmek için giriş yapmalısınız!");
      return;
    }

    if (newReview.trim() === "") {
      toast.error(texts.home.emptyReview || "❌ Boş yorum ekleyemezsiniz!");
      return;
    }

    const reviewData = {
      id: Date.now(),
      name: user?.name || "Anonim Kullanıcı",
      feedback: newReview,
      avatar: user?.profileImage || "https://randomuser.me/api/portraits/lego/5.jpg",
    };

    dispatch(addReview(reviewData));
    setNewReview("");
    toast.success(texts.home.reviewSubmitted || "✅ Yorum başarıyla eklendi!");
  };

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReview(reviewId));
    toast.warn(texts.home.reviewDeleted || "🗑️ Yorum silindi.");
  };

  return (
    <TestimonialsContainer theme={theme}>
      <h2>{texts.home.testimonials || "Müşteri Yorumları"}</h2>
      {loading && <p>🔄 {texts.loading || "Yükleniyor..."}</p>}
      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {reviews.slice(0, visibleReviews).map((testimonial) => (
        <TestimonialCard key={testimonial.id} theme={theme}>
          <Avatar src={testimonial.avatar} alt={testimonial.name} />
          <CustomerName>{testimonial.name}</CustomerName>
          <Feedback>{testimonial.feedback}</Feedback>
          
          {/* ✅ Admin ise Silme Butonu Göster */}
          {user?.role === "admin" && (
            <DeleteButton onClick={() => handleDeleteReview(testimonial.id)} theme={theme}>
              🗑️ {texts.home.delete || "Sil"}
            </DeleteButton>
          )}
        </TestimonialCard>
      ))}

      {/* ✅ Daha Fazla Göster Butonu RENK GÜNCELLENDİ */}
      {reviews.length > visibleReviews && (
        <ShowMoreButton onClick={() => setVisibleReviews(reviews.length)} theme={theme}>
          {texts.home.showMore || "Daha Fazla Göster"}
        </ShowMoreButton>
      )}

      {/* ✅ Kullanıcı Yorumu Ekleme Formu */}
      {user && (
        <ReviewForm theme={theme}>
          <ReviewInput
            type="text"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder={texts.home.addReview || "Yorumunuzu yazın..."}
            theme={theme}
          />
          <SubmitButton onClick={handleAddReview} theme={theme}>
            {texts.home.submitReview || "Gönder"}
          </SubmitButton>
        </ReviewForm>
      )}
    </TestimonialsContainer>
  );
};

export default Testimonials;
