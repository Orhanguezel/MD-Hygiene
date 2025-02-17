import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/features/auth/authSlice";
import { AuthContainer, Button } from "@/styles/authStyles"; // ✅ Ortak stil dosyası kullanıldı
import { useTheme } from "@/features/theme/useTheme";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // ✅ Çıkış sonrası login sayfasına yönlendirme
  };

  return (
    <AuthContainer theme={theme}>
      <Button theme={theme} onClick={handleLogout}>🚪 Çıkış Yap</Button>
    </AuthContainer>
  );
};

export default Logout;
