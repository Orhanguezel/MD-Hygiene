import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { API } from "../../services/api";
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import {
  ProfileContainer,
  ProfileCard,
  AvatarContainer,
  AvatarImage,
  UploadButton,
  Form,
  InputGroup,
  Label,
  Input,
  Button,
  ErrorMessage,
  SuccessMessage,
} from "../../styles/ProfileStyles";

const Profil = () => {
  const { user } = useContext(AuthContext);
  const [profilDaten, setProfilDaten] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });
  const [laden, setLaden] = useState(false);
  const [nachricht, setNachricht] = useState(null);
  const [fehler, setFehler] = useState(null);

  useEffect(() => {
    if (user) {
      setProfilDaten({
        name: user.name,
        email: user.email,
        password: "",
        image: user.imageUrl || "/default-profile.png",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setProfilDaten({ ...profilDaten, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilDaten({ ...profilDaten, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLaden(true);
    setFehler(null);
    setNachricht(null);

    try {
      const response = await fetch(`${API.USERS}/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profilDaten),
      });

      if (!response.ok) throw new Error("Profil konnte nicht aktualisiert werden!");

      setNachricht("✅ Profil wurde erfolgreich aktualisiert!");
    } catch (err) {
      setFehler(err.message);
    } finally {
      setLaden(false);
    }
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <AvatarContainer>
          <AvatarImage src={profilDaten.image} alt="Profilbild" />
          <UploadButton>
            <FaImage />
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </UploadButton>
        </AvatarContainer>

        <Form onSubmit={handleSubmit}>
          {fehler && <ErrorMessage>{fehler}</ErrorMessage>}
          {nachricht && <SuccessMessage>{nachricht}</SuccessMessage>}

          <InputGroup>
            <Label><FaUser /> Name</Label>
            <Input type="text" name="name" value={profilDaten.name} onChange={handleChange} />
          </InputGroup>

          <InputGroup>
            <Label><FaEnvelope /> E-Mail</Label>
            <Input type="email" name="email" value={profilDaten.email} onChange={handleChange} />
          </InputGroup>

          <InputGroup>
            <Label><FaLock /> Neues Passwort</Label>
            <Input type="password" name="password" value={profilDaten.password} onChange={handleChange} placeholder="Geben Sie ein neues Passwort ein" />
          </InputGroup>

          <Button type="submit" disabled={laden}>
            {laden ? "Wird gespeichert..." : "Profil aktualisieren"}
          </Button>
        </Form>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profil;
