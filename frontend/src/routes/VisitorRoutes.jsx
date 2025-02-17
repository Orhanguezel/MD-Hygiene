import { Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Home from "@/pages/visitor/home/Home";
import NotFound from "@/pages/navbar/NotFound";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Unauthorized from "@/pages/auth/Unauthorized";
import ProductDetail from "@/pages/visitor/home/components/ProductDetail";
//import TermsOfService from "@/pages/visitor/TermsOfService"; 
//import PrivacyPolicy from "@/pages/visitor/PrivacyPolicy"; 

const VisitorRoutes = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="product/:id" element={<ProductDetail />} />



      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default VisitorRoutes;
