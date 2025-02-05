import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../AuthContext";
import Layout from "./Layout"; // Layout'ü içeri alıyoruz

const ProtectedWrapper = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout> // 🔥 Layout eklendi, artık sayfa kaybolmayacak!
  );
};

export default ProtectedWrapper;
