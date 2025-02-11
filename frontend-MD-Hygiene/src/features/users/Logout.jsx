import { useAuth } from "@/features/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { AuthContainer, LoadingMessage } from "@/styles/authStyles"; // ✅ Ortak stil dosyası

const Logout = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const { texts } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    signout();
    navigate("/login");
  }, [signout, navigate]);

  return (
    <AuthContainer theme={theme}>
      <LoadingMessage theme={theme}>
        {texts?.auth?.loggingOut || "Çıkış yapılıyor..."}
      </LoadingMessage>
    </AuthContainer>
  );
};

export default Logout;
