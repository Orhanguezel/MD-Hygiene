import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedWrapper from "../pages/auth/ProtectedWrapper";
import AdminDashboard from "../components/admin/AdminDashboard";
import NotFound from "../components/common/NotFound";

const AdminRoutes = () => {
  return (
    <ProtectedWrapper>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ProtectedWrapper>
  );
};

export default AdminRoutes;
