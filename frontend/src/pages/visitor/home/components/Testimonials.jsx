// ✅ src/pages/visitor/home/components/Testimonials.jsx
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
    feedback: "This product has changed my life!",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    feedback: "Excellent service and great quality.",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];

const Testimonials = () => {
  return (
    <TestimonialsContainer>
      <h2>Müşteri Yorumları</h2>
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
