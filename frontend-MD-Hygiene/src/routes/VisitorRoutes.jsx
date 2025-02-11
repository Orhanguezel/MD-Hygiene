import { Routes, Route } from "react-router-dom";
import VisitorLayout from "@/layouts/VisitorLayout";
import Home from "@/pages/visitor/Home";
import About from "@/pages/visitor/About";
import Contact from "@/pages/visitor/Contact";
import NotFound from "@/components/common/NotFound";

const VisitorRoutes = () => (
  <Routes>
    <Route element={<VisitorLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default VisitorRoutes;
