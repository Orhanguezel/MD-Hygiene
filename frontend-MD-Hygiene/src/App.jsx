import Home from "./components/Home";
import ContactForm from "./components/ContactForm";
import Layout from "./components/Layout";
import Produkte from "./components/Produkte";
import NotFound from "./components/NotFound";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <h1>MD Hygiene</h1>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produkte" element={<Produkte />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
