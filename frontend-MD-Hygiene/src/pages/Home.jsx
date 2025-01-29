import { useState } from "react";
import { Container, Content, Form, Input, Button, Message } from "../styles/HomeStyles";

const Home = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/`, {
      method: "GET",
    });
    const data = await response.text();
    setMessage(data);
  };

  return (
    <Container>
      <Content>
        <h1>Willkommen auf unserer Webseite</h1>
        <p>Unsere Webseite ist derzeit im Aufbau. Bitte hinterlassen Sie Ihre E-Mail, um informiert zu bleiben.</p>
        <Form onSubmit={handleSubmit}>
          <Input 
            type="email" 
            placeholder="Ihre E-Mail Adresse" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <Button type="submit">Absenden</Button>
        </Form>
        {message && <Message>Antwort vom Server: {message}</Message>}
      </Content>
    </Container>
  );
};

export default Home;
