import Home from "./components/Home";
import ContactForm from "./components/ContactForm";
import NotFound from "./components/NotFound";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  const formData = {
    name: "",
    email: "",
    message: "",
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactForm formData={formData} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;

