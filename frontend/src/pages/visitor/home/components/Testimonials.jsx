import { useLanguage } from "@/features/language/useLanguage"; // ✅ Dil Desteği
import {
  TestimonialsContainer,
  TestimonialCard,
  Avatar,
  CustomerName,
  Feedback,
} from "../styles/TestimonialsStyles";

const testimonialsData = [
  {
    id: 1,
    name: "John Doe",
    feedback: "✨ Bu ürün hayatımı değiştirdi!",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    feedback: "🔥 Mükemmel hizmet ve harika kalite.",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];

const Testimonials = () => {
  const { texts } = useLanguage();

  return (
    <TestimonialsContainer>
      <h2>{texts.home.testimonials}</h2>
      {testimonialsData.map((testimonial) => (
        <TestimonialCard key={testimonial.id}>
          <Avatar src={testimonial.avatar} alt={testimonial.name} />
          <CustomerName>{testimonial.name}</CustomerName>
          <Feedback>{testimonial.feedback}</Feedback>
        </TestimonialCard>
      ))}
    </TestimonialsContainer>
  );
};

export default Testimonials;
