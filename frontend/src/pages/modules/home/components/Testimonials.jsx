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
  ShowMoreButton,
} from "../styles/TestimonialsStyles";

const Testimonials = () => {
  const dispatch = useDispatch();
  const { texts } = useLanguage();
  const theme = useSelector((state) => state.theme);
  const { reviews = [], loading, error } = useSelector((state) => state.review) || {}; // ✅ Boş array varsayıldı
  const user = useSelector((state) => state.auth.user);
  const [newReview, setNewReview] = useState("");
  const [visibleReviews, setVisibleReviews] = useState(5); // ✅ İlk başta 5 yorum göster

  useEffect(() => {
    dispatch(fetchReviews()); // ✅ Redux Store’dan yorumları çek
  }, [dispatch]);

  const handleAddReview = () => {
    if (!user) {
      toast.error(texts.review?.toast?.onlyMembers || "🚫 Yorum yapmak için üye olmalısınız!");
      return;
    }

    if (newReview.trim() === "") {
      toast.error(texts.review?.toast?.emptyReview || "❌ Yorum boş olamaz!");
      return;
    }

    const reviewData = {
      id: Date.now(),
      name: user?.name || texts.review?.anonymous || "Anonim Kullanıcı",
      feedback: newReview,
      avatar: user?.profileImage || "/default-avatar.png",
    };

    dispatch(addReview(reviewData));
    setNewReview("");
    toast.success(texts.review?.toast?.reviewSubmitted || "✅ Yorum başarıyla eklendi!");
  };

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReview(reviewId));
    toast.warn(texts.review?.toast?.reviewDeleted || "🗑️ Yorum silindi.");
  };

  return (
    <TestimonialsContainer theme={theme}>
      <h2>{texts.review?.testimonials || "Müşteri Yorumları"}</h2>
      {loading && <p>🔄 {texts.global?.loading || "Yükleniyor..."}</p>}
      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {reviews.slice(0, visibleReviews).map((testimonial) => (
        <TestimonialCard key={testimonial.id} theme={theme}>
          <Avatar src={testimonial.avatar} alt={testimonial.name} />
          <CustomerName>{testimonial.name}</CustomerName>
          <Feedback>{testimonial.feedback}</Feedback>
          
          {user?.role === "admin" && (
            <DeleteButton onClick={() => handleDeleteReview(testimonial.id)} theme={theme}>
              🗑️ {texts.review?.delete || "Sil"}
            </DeleteButton>
          )}
        </TestimonialCard>
      ))}

      {reviews.length > visibleReviews && (
        <ShowMoreButton onClick={() => setVisibleReviews(reviews.length)} theme={theme}>
          {texts.review?.showMore || "Daha Fazla Göster"}
        </ShowMoreButton>
      )}

      {user && (
        <ReviewForm theme={theme}>
          <ReviewInput
            type="text"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder={texts.review?.addReview || "Yorumunuzu yazın..."}
            theme={theme}
          />
          <SubmitButton onClick={handleAddReview} theme={theme}>
            {texts.review?.submitReview || "Gönder"}
          </SubmitButton>
        </ReviewForm>
      )}
    </TestimonialsContainer>
  );
};

export default Testimonials;
