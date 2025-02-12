import { Routes, Route } from "react-router-dom";
import VisitorLayout from "@/layouts/VisitorLayout";
import Home from "@/pages/visitor/home/Home";
import About from "@/pages/visitor/About";
import Contact from "@/pages/visitor/Contact";
import NotFound from "@/components/common/NotFound";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Unauthorized from "@/pages/auth/Unauthorized";

const VisitorRouter = () => (
  <Routes>
    <Route element={<VisitorLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default VisitorRouter;
