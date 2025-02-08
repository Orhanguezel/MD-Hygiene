import { useOffers } from "@/context/OfferContext";
import { useLanguage } from "@/context/LanguageContext";
import { OffersContainer, OffersTable, Th, Td, StatusBadge, ActionButton } from "../styles/offerStyles";
import OfferPreviewModal from "./OfferPreviewModal";
import { useState } from "react";

const OfferList = () => {
  const { offers, deleteOffer, changeStatus } = useOffers();
  const { texts } = useLanguage();
  const [selectedOffer, setSelectedOffer] = useState(null);

  return (
    <OffersContainer>
      <h1>{texts?.offer?.title || "Teklif Yönetimi"}</h1> {/* ✅ Güvenli erişim */}
      
      <OffersTable>
        <thead>
          <tr>
            <Th>{texts?.offers?.id || "ID"}</Th>
            <Th>{texts?.offers?.customer || "Müşteri"}</Th>
            <Th>{texts?.offers?.total || "Toplam"}</Th>
            <Th>{texts?.offers?.status || "Durum"}</Th>
            <Th>{texts?.offers?.actions || "İşlemler"}</Th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.id}>
              <Td>{offer.id}</Td>
              <Td>{offer.user}</Td>
              <Td>{offer.totalAmount} ₺</Td>
              <Td>
                <StatusBadge status={offer.status}>{offer.status}</StatusBadge>
              </Td>
              <Td>
                <ActionButton onClick={() => changeStatus(offer.id, "approved")}>
                  {texts?.offers?.approve || "Onayla"}
                </ActionButton>
                <ActionButton onClick={() => changeStatus(offer.id, "rejected")}>
                  {texts?.offers?.reject || "Reddet"}
                </ActionButton>
                <ActionButton onClick={() => setSelectedOffer(offer)}>
                  {texts?.offers?.preview || "Görüntüle"}
                </ActionButton>
                <ActionButton onClick={() => deleteOffer(offer.id)}>
                  {texts?.offers?.delete || "Sil"}
                </ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </OffersTable>

      {selectedOffer && (
        <OfferPreviewModal offer={selectedOffer} onClose={() => setSelectedOffer(null)} />
      )}
    </OffersContainer>
  );
};

export default OfferList;

