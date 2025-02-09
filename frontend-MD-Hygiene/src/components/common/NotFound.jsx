import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/features/language/useLanguage";  // ✅ RTK Dil yönetimi
import { useTheme } from "@/features/theme/useTheme";           // ✅ RTK Tema yönetimi
import {
  NotFoundContainer,
  NotFoundTitle,
  NotFoundMessage,
  HomeButton,
} from "@/styles/NotFoundStyles";

function NotFound() {
  const navigate = useNavigate();
  const { texts } = useLanguage();       // ✅ Dil desteği
  const { theme } = useTheme();          // ✅ Tema desteği

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 5000); // ✅ 5 saniye sonra yönlendirme

    return () => clearTimeout(timer); // ✅ Cleanup
  }, [navigate]);

  return (
    <NotFoundContainer style={{ backgroundColor: theme === "dark" ? "#1e1e1e" : "#f9f9f9" }}>
      <NotFoundTitle>
        {texts?.notFound?.title || "404 - Sayfa Bulunamadı"} {/* ✅ Dinamik başlık */}
      </NotFoundTitle>

      <NotFoundMessage>
        {texts?.notFound?.message || "Üzgünüz, bu sayfa mevcut değil!"} <br />
        {texts?.notFound?.redirectMessage || (
          <> 
            <strong>5 saniye</strong> içinde ana sayfaya yönlendirileceksiniz...
          </>
        )}
      </NotFoundMessage>

      <HomeButton onClick={() => navigate("/")}>
        {texts?.notFound?.homeButton || "Ana Sayfaya Dön"} {/* ✅ Dinamik buton */}
      </HomeButton>
    </NotFoundContainer>
  );
}

export default NotFound;
