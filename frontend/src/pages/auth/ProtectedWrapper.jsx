import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedWrapper = ({ children }) => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  // ⏳ **Yüklenme ekranı**
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>⏳ Yükleniyor, lütfen bekleyin...</p>
      </div>
    );
  }

  // 🚫 **Kullanıcı giriş yapmamışsa login sayfasına yönlendir**
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 **Yetkisiz kullanıcıyı admin sayfalarından engelle**
  if (user?.role !== "admin" && window.location.pathname.startsWith("/admin")) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ **Yetkili kullanıcı içeriği görebilir**
  return children;
};

export default ProtectedWrapper;
