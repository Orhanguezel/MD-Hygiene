import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOffers, deleteOffer } from "@/features/offer/offerSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  OfferListContainer,
  OfferTable,
  OfferButton,
  StatusBadge,
  FilterContainer,
  SearchInput,
  FilterButton,
} from "../styles/offerStyles";

const OfferList = () => {
  const dispatch = useDispatch();
  const { texts } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { offers, status } = useSelector((state) => state.offer);

  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchOffers()).then((response) => {
      console.log("📡 Teklifler yüklendi:", response.payload); // ✅ Konsolda veriyi kontrol et
    });
  }, [dispatch]);

  if (status === "loading") {
    return <p>⏳ {texts?.offers?.loading || "Teklifler yükleniyor..."}</p>;
  }

  // ✅ Filtreleme ve Arama Fonksiyonu
  const filteredOffers = offers.filter((offer) => {
    const offerStatus = offer.status || "draft";
    const matchesStatus = statusFilter === "all" || offerStatus === statusFilter;
    const matchesSearch = 
      offer.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.companyName?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const handleDelete = (id) => {
    dispatch(deleteOffer(id));
    toast.info("🗑️ Teklif siliniyor...");
  };

  return (
    <OfferListContainer theme={theme}>
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

        {["all", "approved", "rejected", "draft"].map((statusType) => (
          <FilterButton
            key={statusType}
            onClick={() => setStatusFilter(statusType)}
            theme={theme}
          >
            {texts?.offers?.[statusType] || statusType.charAt(0).toUpperCase() + statusType.slice(1)}
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
          {filteredOffers.map((offer) => (
            <tr key={offer.id}>
              <td>{offer.id}</td>
              <td>{offer.companyName}</td>
              <td>{offer.customerName}</td>
              <td>
                {offer.selectedProducts && offer.selectedProducts.length > 0
                  ? offer.selectedProducts
                      .reduce((acc, product) => acc + (product.customPrice * product.quantity), 0)
                      .toFixed(2) + " ₺"
                  : "0.00 ₺"}
              </td>
              <td>
                <StatusBadge $status={offer.status || "draft"}>
                  {texts?.offers?.[offer.status] || offer.status || "Taslak"}
                </StatusBadge>
              </td>
              <td>
                <OfferButton theme={theme} onClick={() => navigate(`/offers/${offer.id}`)}>
                  {texts?.offers?.view || "Görüntüle"}
                </OfferButton>
                <OfferButton theme={theme} onClick={() => handleDelete(offer.id)}>
                  {texts?.offers?.delete || "Sil"}
                </OfferButton>
              </td>
            </tr>
          ))}
        </tbody>
      </OfferTable>
    </OfferListContainer>
  );
};

export default OfferList;
