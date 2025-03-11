import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/features/auth/authSlice";
import { AuthContainer, Button } from "@/styles/authStyles";
import { useTheme } from "@/features/theme/useTheme";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(logout());
    navigate("/login"); // ✅ Çıkış sonrası login sayfasına yönlendirme
  }, [dispatch, navigate]);

  return (
    <AuthContainer theme={theme}>
      <Button theme={theme} onClick={() => dispatch(logout())}>🚪 Çıkış Yap</Button>
    </AuthContainer>
  );
};

export default Logout;
