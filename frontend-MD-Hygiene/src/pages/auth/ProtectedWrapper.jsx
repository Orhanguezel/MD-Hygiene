import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth"; // RTK hook kullanımı

const ProtectedWrapper = ({ children, role = "admin" }) => {
  const { user } = useAuth();

  if (!user || (role && user.role !== role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedWrapper;
