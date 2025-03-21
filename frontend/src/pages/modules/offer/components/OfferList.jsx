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
      console.log("📌 Teklifler Yüklendi:", response.payload);
    });
  }, [dispatch]);

  if (status === "loading") {
    return <p>⏳ {texts?.offers?.loading}</p>;
  }

  // ✅ Filtreleme ve Arama Fonksiyonu
  const filteredOffers = offers.filter((offer) => {
    const offerStatus = offer.status || "draft";
    const matchesStatus =
      statusFilter === "all" || offerStatus === statusFilter;
    const matchesSearch =
      offer.customer?.contactName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.company?.companyName?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const handleDelete = (id) => {
    dispatch(deleteOffer(id))
      .unwrap()
      .then(() => toast.success(texts?.offers?.deleteToast))
      .catch(() => toast.error("❌ Teklif silinemedi!"));
  };

  // ✅ Teklif Satırını Render Etme
  const renderOfferRow = (offer) => {
    const totalNet = offer.items.reduce((acc, item) => acc + item.customPrice * item.quantity, 0);
    const taxAmount = (totalNet * offer.taxRate) / 100;
    const grandTotal = totalNet + taxAmount + (offer.shippingCost || 0);

    return (
      <tr key={offer._id}>
        <td>{offer.offerNumber}</td>
        <td>{offer.company?.companyName || "Bilinmeyen Şirket"}</td>
        <td>{offer.customer?.contactName || "Bilinmeyen Müşteri"}</td>
        <td>{totalNet.toFixed(2)} ₺</td>
        <td>{taxAmount.toFixed(2)} ₺</td>
        <td>{grandTotal.toFixed(2)} ₺</td>
        <td>{offer.paymentTerms || "Tanımlanmamış"}</td>
        <td>{new Date(offer.validUntil).toLocaleDateString()}</td>
        <td>
          <StatusBadge $status={offer.status || "draft"}>
            {texts?.offers?.statuses?.[offer.status] || texts?.offers?.statuses?.draft}
          </StatusBadge>
        </td>
        <td>
          <OfferButton theme={theme} onClick={() => navigate(`/offers/${offer._id}`)}>
            {texts?.offers?.view}
          </OfferButton>
          <OfferButton theme={theme} onClick={() => handleDelete(offer._id)}>
            {texts?.offers?.delete}
          </OfferButton>
        </td>
      </tr>
    );
  };

  return (
    <OfferListContainer theme={theme}>
      <h2>{texts?.offers?.listTitle}</h2>

      {/* ✅ Filtreleme ve Arama Alanı */}
      <FilterContainer>
        <SearchInput
          type="text"
          placeholder={texts?.offers?.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          theme={theme}
        />

        {["all", "approved", "rejected", "draft"].map((statusType) => (
          <FilterButton
            key={statusType}
            onClick={() => setStatusFilter(statusType)}
            theme={theme}
            $active={statusFilter === statusType}
          >
            {texts?.offers?.statuses?.[statusType]}
          </FilterButton>
        ))}
      </FilterContainer>

      <OfferTable theme={theme}>
        <thead>
          <tr>
            <th>{texts?.offers?.offerNumber}</th>
            <th>{texts?.offers?.companyName}</th>
            <th>{texts?.offers?.customerName}</th>
            <th>{texts?.offers?.netTotal}</th>
            <th>{texts?.offers?.taxTotal}</th>
            <th>{texts?.offers?.totalAmount}</th>
            <th>{texts?.offers?.paymentTerms}</th>
            <th>{texts?.offers?.validUntil}</th>
            <th>{texts?.offers?.status}</th>
            <th>{texts?.offers?.actions}</th>
          </tr>
        </thead>

        <tbody>
          {filteredOffers.length > 0 ? (
            filteredOffers.map(renderOfferRow)
          ) : (
            <tr>
              <td colSpan="10">{texts?.offers?.noOffers}</td>
            </tr>
          )}
        </tbody>
      </OfferTable>
    </OfferListContainer>
  );
};

export default OfferList;
