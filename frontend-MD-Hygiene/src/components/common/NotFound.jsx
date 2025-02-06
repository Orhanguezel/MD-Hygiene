import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  NotFoundContainer,
  NotFoundTitle,
  NotFoundMessage,
  HomeButton,
} from "../../styles/NotFoundStyles";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true }); 
    }, 5000); // ✅ 5 saniyelik gecikme eklendi

    return () => clearTimeout(timer); // ✅ Cleanup doğru yerde
  }, [navigate]);

  return (
    <NotFoundContainer>
      <NotFoundTitle>404 - Seite nicht gefunden</NotFoundTitle>
      <NotFoundMessage>
        Entschuldigung, diese Seite existiert nicht! <br />
        Sie werden in <strong>5 Sekunden</strong> zur Startseite weitergeleitet...
      </NotFoundMessage>
      <HomeButton onClick={() => navigate("/")}>Zur Startseite</HomeButton>
    </NotFoundContainer>
  );
}

export default NotFound;
