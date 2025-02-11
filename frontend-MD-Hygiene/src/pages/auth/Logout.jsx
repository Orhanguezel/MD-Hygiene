import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/features/auth/authSlice";
import { AuthContainer, Button } from "@/styles/authStyles";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // ✅ Çıkış sonrası login sayfasına yönlendirme
  };

  return (
    <AuthContainer>
      <Button onClick={handleLogout}>Çıkış Yap</Button>
    </AuthContainer>
  );
};

export default Logout;
