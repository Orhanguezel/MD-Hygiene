import { Container, Content } from "../styles/HomeStyles";
import ContactForm from "./ContactForm";

const Home = () => {
  const formData = {
    name: "",
    email: "",
    message: "",
  };

  return (
    <Container>
      <Content>
        <h1>Willkommen auf unserer Webseite</h1>
        <p>Unsere Webseite ist derzeit im Aufbau. Bitte hinterlassen Sie Ihre E-Mail, um informiert zu bleiben.</p>
        <ContactForm formData={formData} />
      </Content>
    </Container>
  );
};

export default Home;

