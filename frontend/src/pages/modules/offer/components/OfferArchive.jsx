import OfferPDF from "./OfferPDF";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOffers } from "@/features/offer/offerSlice";
import { useLanguage } from "@/features/language/useLanguage"; // ✅ Dil desteği
import { useTheme } from "@/features/theme/useTheme";         // ✅ Tema desteği
import { toast } from "react-toastify";
import {
  ArchiveContainer,
  SearchInput,
  OfferTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  NoDataCell,
} from "../styles/offerArchiveStyles"; // ✅ Stil dosyası

const OfferArchive = () => {
  const dispatch = useDispatch();
  const { texts } = useLanguage(); // 🌍 Dil kullanımı aktif
  const { theme } = useTheme();    // 🎨 Tema kullanımı aktif
  const { offers, status } = useSelector((state) => state.offer);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchOffers()); // ✅ Redux Store'dan teklifleri çek
  }, [dispatch]);

  // ✅ Arşivlenmiş teklifleri filtrele
  const archivedOffers = offers?.filter((offer) => offer.status === "archived") || [];

  // ✅ Firma adına göre filtreleme
  const filteredOffers = archivedOffers.filter((offer) => {
    const companyName = offer?.companyName?.toLowerCase() || "";
    return companyName.includes(searchTerm.toLowerCase());
  });

  if (status === "loading") {
    return <p>⏳ {texts?.loading}</p>;
  }

  return (
    <ArchiveContainer theme={theme}>
      <h2>{texts?.offers?.archivedTitle || "📁 Arşivlenmiş Teklifler"}</h2>

      {/* 🔍 Arama Kutusu */}
      <SearchInput
        type="text"
        placeholder={texts?.offers?.searchPlaceholder || "Firma adı ile ara..."}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        theme={theme}
      />

      {/* 📄 Teklifler Tablosu */}
      <OfferTable theme={theme}>
        <TableHead theme={theme}>
          <tr>
            <th>ID</th>
            <th>{texts?.offers?.companyName || "Firma Adı"}</th>
            <th>{texts?.offers?.customerName || "Müşteri Adı"}</th>
            <th>{texts?.offers?.status || "Durum"}</th>
            <th>PDF</th>
          </tr>
        </TableHead>
        <TableBody>
          {filteredOffers.length > 0 ? (
            filteredOffers.map((offer) => (
              <TableRow key={offer.id} theme={theme}>
                <TableCell>{offer.id || "N/A"}</TableCell>
                <TableCell>{offer.companyName || texts?.offers?.unknown || "Bilinmiyor"}</TableCell>
                <TableCell>{offer.customerName || texts?.offers?.unknown || "Bilinmiyor"}</TableCell>
                <TableCell>{texts?.offers?.statuses?.[offer.status] || offer.status || "Taslak"}</TableCell>
                <TableCell>
                  {offer.selectedProducts?.length > 0 ? (
                    <OfferPDF offer={offer} />
                  ) : (
                    <span style={{ color: "gray" }}>{texts?.offers?.noData || "Veri Yok"}</span>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <tr>
              <NoDataCell colSpan="5">
                {texts?.offers?.noArchived || "Arşivlenmiş teklif bulunamadı."}
              </NoDataCell>
            </tr>
          )}
        </TableBody>
      </OfferTable>
    </ArchiveContainer>
  );
};

export default OfferArchive;
