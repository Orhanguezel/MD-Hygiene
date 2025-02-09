// ✅ OfferDetails.jsx (Redux Toolkit ile Güncellendi)
import { useParams } from "react-router-dom";
import { useOffers } from "@/features/offers/useOffers";
import { useLanguage } from "@/features/language/useLanguage";
import {
  OfferDetailsContainer,
  OfferInfo,
  ProductList,
  ProductItem,
  StatusBadge,
  ActionButton
} from "../styles/offerStyles";
import jsPDF from "jspdf";
import "jspdf-autotable";

const OfferDetails = () => {
  const { id } = useParams();
  const { offers } = useOffers();
  const { texts } = useLanguage();

  const offer = offers.find((o) => o.id === id);

  if (!offer) return <p>{texts?.offers?.notFound || "Teklif bulunamadı."}</p>;

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`${texts.offers.details} - ${offer.id}`, 10, 10);

    doc.autoTable({
      head: [[
        texts.offers.product,
        texts.offers.quantity,
        texts.offers.unitPrice,
        texts.offers.total
      ]],
      body: offer.items.map((item) => [
        item.product,
        item.quantity,
        `${item.unitPrice} ₺`,
        `${item.unitPrice * item.quantity} ₺`
      ])
    });

    doc.text(`${texts.offers.total}: ${offer.totalAmount} ₺`, 10, doc.lastAutoTable.finalY + 10);
    doc.save(`Teklif_${offer.id}.pdf`);
  };

  return (
    <OfferDetailsContainer>
      <h1>{texts.offers.details}</h1>
      <OfferInfo>
        <p><strong>{texts.offers.id}:</strong> {offer.id}</p>
        <p><strong>{texts.offers.customer}:</strong> {offer.user}</p>
        <p><strong>{texts.offers.status}:</strong> <StatusBadge status={offer.status}>{offer.status}</StatusBadge></p>
        <p><strong>{texts.offers.total}:</strong> {offer.totalAmount} ₺</p>
      </OfferInfo>

      <h2>{texts.offers.items}</h2>
      <ProductList>
        {offer.items.map((item, index) => (
          <ProductItem key={index}>
            <p>{item.product}</p>
            <p>{texts.offers.quantity}: {item.quantity}</p>
            <p>{texts.offers.unitPrice}: {item.unitPrice} ₺</p>
            <p>{texts.offers.total}: {item.unitPrice * item.quantity} ₺</p>
          </ProductItem>
        ))}
      </ProductList>

      <ActionButton onClick={generatePDF}>{texts.offers.downloadPDF || "PDF İndir"}</ActionButton>
    </OfferDetailsContainer>
  );
};

export default OfferDetails;
