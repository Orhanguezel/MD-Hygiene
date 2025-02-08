import React, { useState } from "react";
import OfferSidebar from "./components/OfferSidebar";
import OfferList from "./components/OfferList";
import OfferCreate from "./components/OfferCreate";
import OfferPDF from "./components/OfferPDF";
import AddProduct from "./components/AddProduct";
import SetShippingCost from "./components/SetShippingCost";
import OfferDetails from "./components/OfferDetails"; // ✅ Teklif Detayları

const Offer = () => {
  const [activeSection, setActiveSection] = useState("list");
  const [selectedOffer, setSelectedOffer] = useState(null); // ✅ Seçilen teklifi takip et

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

  const handleSelectOffer = (offer) => {
    setSelectedOffer(offer);
    setActiveSection("details"); // ✅ Teklif seçilince detay sayfasına yönlendir
  };

  return (
    <div style={{ display: "flex" }}>
      <OfferSidebar setActiveSection={setActiveSection} />
      <div style={{ padding: "20px", flexGrow: 1 }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Offer;
