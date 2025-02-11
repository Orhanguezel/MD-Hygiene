import { useOffers } from "@/features/offer/useOffers";    // ✅ RTK Hook
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  OfferListContainer,
  OfferTable,
  OfferButton,
  StatusBadge,
  FilterContainer,
  SearchInput,
  FilterButton,
} from "../styles/offerStyles";  // ✅ Stil dosyası

const OfferList = () => {
  const { offers, deleteOffer } = useOffers();
  const { texts } = useLanguage(); // ✅ Dil desteği eklendi
  const { theme } = useTheme();    // ✅ Tema desteği eklendi
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Filtreleme ve Arama Fonksiyonu
  const filteredOffers = offers.filter((offer) => {
    const status = offer.status || "draft";  // ✅ Varsayılan olarak "draft"
    const matchesStatus = statusFilter === "all" || status === statusFilter;
    const matchesSearch = 
      (offer.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) || "") ||
      (offer.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) || "");

    return matchesStatus && matchesSearch;
  });

  return (
    <OfferListContainer theme={theme} style={{ backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff", color: theme === "dark" ? "#fff" : "#000" }}>
      <h2>{texts?.offers?.listTitle || "📋 Teklif Listesi"}</h2>

      {/* ✅ Filtreleme ve Arama Alanı */}
      <FilterContainer>
        <SearchInput
          type="text"
          placeholder={texts?.offers?.searchPlaceholder || "Ara..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          theme={theme}
        />

        {["all", "approved", "rejected", "draft"].map((status) => (
          <FilterButton
            key={status}
            onClick={() => setStatusFilter(status)}
            active={statusFilter === status}
            theme={theme}
          >
            {texts?.offers?.[status] || status.charAt(0).toUpperCase() + status.slice(1)}
          </FilterButton>
        ))}
      </FilterContainer>

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
          {filteredOffers.map((offer) => {
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
                  <StatusBadge $status={offer.status || "draft"}>
                    {texts?.offers?.[offer.status] || offer.status || "Taslak"}
                  </StatusBadge>
                </td>
                <td>
                  <OfferButton theme={theme} onClick={() => navigate(`/offers/${offer.id}`)}>
                    {texts?.offers?.view || "Görüntüle"}
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
