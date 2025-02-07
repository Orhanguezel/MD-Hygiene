// 📂 components/offer/OfferPDF.jsx
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const generateOfferPDF = (offer) => {
  const doc = new jsPDF();
  doc.text("📄 Teklif Belgesi", 20, 20);

  doc.autoTable({
    startY: 30,
    head: [["Müşteri", "Toplam (€)", "Tarih"]],
    body: [[offer.customer, `€${offer.total}`, offer.date]],
  });

  doc.save(`Teklif_${offer.id}.pdf`);
};

const OfferPDF = ({ offer }) => {
  return (
    <button onClick={() => generateOfferPDF(offer)}>📥 PDF Olarak İndir</button>
  );
};

export default OfferPDF;
