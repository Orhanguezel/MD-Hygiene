// ✅ src/features/offer/Offer.jsx
import { useState } from "react";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";

import OfferSidebar from "./components/OfferSidebar";
import OfferList from "./components/OfferList";
import OfferCreate from "./components/OfferCreate";
import OfferPDF from "./components/OfferPDFGenerator";
import AddProduct from "./components/AddProduct";
import SetShippingCost from "./components/SetShippingCost";
import OfferDetails from "./components/OfferDetails";

const Offer = () => {
  const { texts } = useLanguage();
  const { theme } = useTheme();

  const [activeSection, setActiveSection] = useState("list");
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleSelectOffer = (offer) => {
    setSelectedOffer(offer);
    setActiveSection("details");
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
        return (
          <OfferDetails
            offer={selectedOffer}
            onBack={() => setActiveSection("list")}
          />
        );
      default:
        return <OfferList onSelectOffer={handleSelectOffer} />;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
      }}
    >
      <OfferSidebar setActiveSection={setActiveSection} />
      <div style={{ padding: "20px", flexGrow: 1, minHeight: "100vh" }}>
        <h1
          style={{
            color: theme === "dark" ? "#fff" : "#000",
            borderBottom: "2px solid #ccc",
            paddingBottom: "10px",
          }}
        >
          {texts?.offers?.title || "📋 Teklifler"}
        </h1>
        <div style={{ marginTop: "20px" }}>{renderContent()}</div>
      </div>
    </div>
  );
};

export default Offer;
