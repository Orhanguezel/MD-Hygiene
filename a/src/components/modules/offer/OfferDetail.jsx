// 📂 components/offer/OfferDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOfferById, updateOffer } from "../../api/offerApi";
import { FormContainer, Input, Button } from "../../styles/OfferStyles";

const OfferDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const data = await getOfferById(id);
        setOffer(data);
      } catch (error) {
        console.error("Teklif detayları yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffer();
  }, [id]);

  const handleSave = async () => {
    await updateOffer(id, offer);
    setEditMode(false);
  };

  if (loading) return <p>⏳ Yükleniyor...</p>;
  if (!offer) return <p>⚠️ Teklif bulunamadı!</p>;

  return (
    <FormContainer>
      <h2>📄 Teklif Detayları</h2>
      <Input type="text" value={offer.customer} onChange={(e) => setOffer({ ...offer, customer: e.target.value })} disabled={!editMode} />
      <Input type="number" value={offer.total} onChange={(e) => setOffer({ ...offer, total: e.target.value })} disabled={!editMode} />
      <Input type="date" value={offer.date} onChange={(e) => setOffer({ ...offer, date: e.target.value })} disabled={!editMode} />
      <Button onClick={() => setEditMode(!editMode)}>{editMode ? "İptal" : "Düzenle"}</Button>
      {editMode && <Button onClick={handleSave}>Kaydet</Button>}
      <Button onClick={() => navigate("/offers")}>Geri Dön</Button>
    </FormContainer>
  );
};

export default OfferDetail;
