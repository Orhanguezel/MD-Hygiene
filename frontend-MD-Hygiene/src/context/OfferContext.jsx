import { createContext, useContext, useEffect, useState } from "react";
import offersData from "@/data/offers.json"; // ✅ JSON verilerini içe aktar

const OfferContext = createContext();

export const OfferProvider = ({ children }) => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    setOffers(offersData); // ✅ Başlangıçta dummy verileri yükle
  }, []);

  const addOffer = (offer) => setOffers((prev) => [...prev, offer]);
  const updateOffer = (updatedOffer) =>
    setOffers((prev) =>
      prev.map((offer) => (offer.id === updatedOffer.id ? updatedOffer : offer))
    );
  const deleteOffer = (id) =>
    setOffers((prev) => prev.filter((offer) => offer.id !== id));
  const changeStatus = (id, status) =>
    setOffers((prev) =>
      prev.map((offer) =>
        offer.id === id ? { ...offer, status: status } : offer
      )
    );

  return (
    <OfferContext.Provider
      value={{ offers, addOffer, updateOffer, deleteOffer, changeStatus }}
    >
      {children}
    </OfferContext.Provider>
  );
};

export const useOffers = () => {
  const context = useContext(OfferContext);
  if (!context) {
    throw new Error("useOffers must be used within an OfferProvider");
  }
  return context;
};
