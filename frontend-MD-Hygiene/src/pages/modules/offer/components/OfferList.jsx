import { useOffers } from "@/features/offers/useOffers";    // ✅ RTK Hook
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { useNavigate } from "react-router-dom";
import {
  OfferListContainer,
  OfferTable,
  OfferButton,
  StatusBadge,
} from "../styles/offerStyles";  // ✅ Stil dosyası

const OfferList = () => {
  const { offers, deleteOffer } = useOffers();
  const { texts } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <OfferListContainer theme={theme}>
      <h2>{texts?.offers?.listTitle || "📋 Teklif Listesi"}</h2>

      <OfferTable theme={theme}>
        <thead>
          <tr>
            <th>ID</th>
            <th>{texts?.offers?.companyName || "Firma Adı"}</th>
            <th>{texts?.offers?.customerName || "Müşteri Adı"}</th>
            <th>{texts?.offers?.totalAmount || "Toplam Tutar (₺)"}</th>
            <th>{texts?.offers?.status || "Durum"}</th>
            <th>{texts?.offers?.actions || "İşlemler"}</th>
          </tr>
        </thead>

        <tbody>
          {offers.map((offer) => {
            const totalShipping = (offer.selectedProducts || []).reduce(
              (acc, item) => acc + (item.shippingCost || 0),
              0
            );
            const totalAmount = (offer.selectedProducts || []).reduce(
              (acc, item) => acc + item.customPrice * item.quantity,
              0
            ) + totalShipping;

            return (
              <tr key={offer.id}>
                <td>{offer.id}</td>
                <td>{offer.companyName}</td>
                <td>{offer.customerName}</td>
                <td>{totalAmount.toFixed(2)} ₺</td>
                <td>
                  <StatusBadge status={offer.status || "Taslak"}>
                    {offer.status || texts?.offers?.draft || "Taslak"}
                  </StatusBadge>
                </td>
                <td>
                  <OfferButton theme={theme} onClick={() => navigate(`/offers/${offer.id}`)}>
                    {texts?.offers?.view || "Görüntüle"}
                  </OfferButton>
                  <OfferButton theme={theme} onClick={() => navigate(`/offers/create?id=${offer.id}`)}>
                    {texts?.offers?.edit || "Düzenle"}
                  </OfferButton>
                  <OfferButton theme={theme} onClick={() => deleteOffer(offer.id)}>
                    {texts?.offers?.delete || "Sil"}
                  </OfferButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </OfferTable>
    </OfferListContainer>
  );
};

export default OfferList;
