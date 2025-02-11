import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedWrapper = ({ children, role }) => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  // 1️⃣ Yüklenme kontrolü
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>⏳ Yükleniyor, lütfen bekleyin...</p>
      </div>
    );
  }

  // 2️⃣ Giriş yapılmamışsa login sayfasına yönlendir
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3️⃣ Yetkisiz rol kontrolü
  if (role && (!user || (Array.isArray(role) ? !role.includes(user.role) : user.role !== role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 4️⃣ Yetkili kullanıcılar için içerik gösterimi
  return children;
};

export default ProtectedWrapper;
