import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/AuthContext"; // ✅ Eksik yol düzeltildi
import Layout from "../../components/Layout"; // ✅ Layout dosyası eklendi

const ProtectedWrapper = () => {
  const { user } = useContext(AuthContext);

  if (!user?.token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout> 
  );
};

export default ProtectedWrapper;
