import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateOffer } from "@/features/offers/offerSlice";

const OfferDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const offers = useSelector((state) => state.offer);
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    const foundOffer = offers.find((o) => o.id === id);
    setOffer(foundOffer);
  }, [offers, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOffer((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    dispatch(updateOffer(offer));
    alert("Teklif güncellendi!");
  };

  if (!offer) return <p>Teklif bulunamadı.</p>;

  return (
    <div>
      <h2>📋 Teklif Detayları</h2>
      <label>Firma:</label>
      <input type="text" name="companyName" value={offer.companyName} onChange={handleInputChange} />

      <label>Müşteri:</label>
      <input type="text" name="customerName" value={offer.customerName} onChange={handleInputChange} />

      <label>Durum:</label>
      <input type="text" name="status" value={offer.status} onChange={handleInputChange} />

      <button onClick={handleUpdate}>Güncelle</button>
    </div>
  );
};

export default OfferDetails;
