import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ProtectedWrapper = ({ children, role }) => {
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Token kontrolü
    const verifyToken = async () => {
      if (token) {
        try {
          // Burada opsiyonel olarak token doğrulama isteği yapılabilir
          setLoading(false);
        } catch (error) {
          console.error("Token doğrulama hatası:", error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedWrapper;
