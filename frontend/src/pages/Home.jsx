import { useState } from "react";
import{ Container, Form } from "../styles/Home";

const Home = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Danke! Wir werden Sie bald kontaktieren: ${email}`);
    setEmail("");
  };

  return (
    <Container>
      <h1>Willkommen auf unserer Webseite</h1>
      <p>Unsere Webseite ist derzeit im Aufbau. Bitte hinterlassen Sie Ihre E-Mail, um informiert zu bleiben.</p>
      <Form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Ihre E-Mail Adresse" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <button type="submit">Absenden</button>
      </Form>
    </Container>
  );
};

export default Home;
