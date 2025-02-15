// ✅ src/features/offer/Offer.jsx
import { useState } from "react";
import { useLanguage } from "@/features/language/useLanguage";
//import { useTheme } from "@/features/theme/useTheme";

import OfferSidebar from "./components/OfferSidebar";
import OfferList from "./components/OfferList";
import OfferCreate from "./components/OfferCreate";
import OfferPDF from "./components/OfferPDF";
import SetShippingCost from "./components/SetShippingCost";
import OfferDetails from "./components/OfferDetails";
import OfferArchive from "./components/OfferArchive"; // ✅ Arşiv Bileşeni

const Offer = () => {
  const { texts } = useLanguage();
 // const { theme } = useTheme();

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
      case "shipping":
        return <SetShippingCost />;
      case "details":
        return (
          <OfferDetails
            offer={selectedOffer}
            onBack={() => setActiveSection("list")}
          />
        );
      case "archive": // ✅ Arşiv Eklendi
        return <OfferArchive />;
      default:
        return <OfferList onSelectOffer={handleSelectOffer} />;
    }
  };

  return (
    <div>
      <OfferSidebar setActiveSection={setActiveSection} />
      <div>
        <h1>{texts?.offers?.title || "📋 Teklifler"}</h1>
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default Offer;
