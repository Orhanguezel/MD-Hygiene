import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Produkte from "./components/Produkte";
import ContactForm from "./components/ContactForm";
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import AuthForm from "./components/AuthForm";

const App = () => {
  return (
    <div className="App">
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produkte" element={<Produkte />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/login" element={<AuthForm />} /> 
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
