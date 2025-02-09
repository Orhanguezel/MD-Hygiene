import { useState } from "react";
import { useLanguage } from "@/features/language/useLanguage";  // ✅ RTK Dil Yönetimi
import { useTheme } from "@/features/theme/useTheme";           // ✅ RTK Tema Yönetimi

import OfferSidebar from "./components/OfferSidebar";
import OfferList from "./components/OfferList";
import OfferCreate from "./components/OfferCreate";
import OfferPDF from "./components/OfferPDF";
import AddProduct from "./components/AddProduct";
import SetShippingCost from "./components/SetShippingCost";
import OfferDetails from "./components/OfferDetails";

const Offer = () => {
  const { texts } = useLanguage();
  const { theme } = useTheme();
  
  const [activeSection, setActiveSection] = useState("list");
  const [selectedOffer, setSelectedOffer] = useState(null); // ✅ Seçilen teklifi takip et

  const handleSelectOffer = (offer) => {
    setSelectedOffer(offer);
    setActiveSection("details"); // ✅ Teklif seçilince detay sayfasına yönlendir
  };

  const renderContent = () => {
    switch (activeSection) {
      case "create":
        return <OfferCreate onOfferCreated={() => setActiveSection("list")} />;
      case "pdf":
        return <OfferPDF offer={selectedOffer} />;
      case "addProduct":
        return <AddProduct />;
      case "shipping":
        return <SetShippingCost />;
      case "details":
        return <OfferDetails offer={selectedOffer} onBack={() => setActiveSection("list")} />;
      default:
        return <OfferList onSelectOffer={handleSelectOffer} />;
    }
  };

  return (
    <div style={{ display: "flex", backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff" }}>
      <OfferSidebar setActiveSection={setActiveSection} />
      <div style={{ padding: "20px", flexGrow: 1 }}>
        <h1 style={{ color: theme === "dark" ? "#fff" : "#000" }}>
          {texts?.offers?.title || "Teklifler"}
        </h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default Offer;
