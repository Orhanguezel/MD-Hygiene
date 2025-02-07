// 📂 components/offer/OfferList.jsx
import { useEffect, useState } from "react";
import { getOffers, deleteOffer } from "../../api/offerApi";
import { useNavigate } from "react-router-dom";
import { Table, TableRow, TableHeader, TableData, Button } from "../../styles/OfferStyles";
import { FaTrash, FaEdit, FaFilePdf } from "react-icons/fa";

const OfferList = () => {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getOffers();
        setOffers(data);
      } catch (error) {
        console.error("Teklifler yüklenemedi:", error);
      }
    };
    fetchOffers();
  }, []);

  const handleDelete = async (id) => {
    await deleteOffer(id);
    setOffers(offers.filter((offer) => offer.id !== id));
  };

  return (
    <div>
      <h2>📄 Teklifler</h2>
      <Button onClick={() => navigate("/offers/create")}>+ Yeni Teklif</Button>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Müşteri</TableHeader>
            <TableHeader>Toplam (€)</TableHeader>
            <TableHeader>Tarih</TableHeader>
            <TableHeader>Durum</TableHeader>
            <TableHeader>İşlemler</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <TableRow key={offer.id}>
              <TableData>{offer.id}</TableData>
              <TableData>{offer.customer}</TableData>
              <TableData>€{offer.total}</TableData>
              <TableData>{offer.date}</TableData>
              <TableData>{offer.status}</TableData>
              <TableData>
                <Button onClick={() => navigate(`/offers/${offer.id}`)}><FaEdit /> Düzenle</Button>
                <Button onClick={() => handleDelete(offer.id)}><FaTrash /> Sil</Button>
                <Button><FaFilePdf /> PDF İndir</Button>
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OfferList;
