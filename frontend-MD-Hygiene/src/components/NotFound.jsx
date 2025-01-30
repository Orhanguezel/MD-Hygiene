import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  NotFoundContainer,
  NotFoundTitle,
  NotFoundMessage,
} from "../styles/NotFoundStyles";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectUser = setTimeout(() => {
      navigate("/");
    }, 5*1000);

    return () => {
      clearTimeout(redirectUser);
    };
  }, [navigate]);

  return (
    <NotFoundContainer>
      <NotFoundTitle>404 - Not Found</NotFoundTitle>
      <NotFoundMessage>
      Entschuldigung, diese Seite existiert nicht! Wir leiten Sie zur Startseite weiter...
      </NotFoundMessage>
    </NotFoundContainer>
  );
}

export default NotFound;