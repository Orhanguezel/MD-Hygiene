// 📂 components/offer/OfferStatus.jsx
import { useState } from "react";
import { updateOfferStatus } from "../../api/offerApi";
import { StatusContainer, Button, Select } from "../../styles/OfferStyles";

const OfferStatus = ({ offer }) => {
  const [status, setStatus] = useState(offer.status);

  const handleStatusChange = async (newStatus) => {
    try {
      await updateOfferStatus(offer.id, newStatus);
      setStatus(newStatus);
    } catch (error) {
      console.error("Teklif durumu güncellenemedi:", error);
    }
  };

  return (
    <StatusContainer>
      <h3>📊 Teklif Durumu</h3>
      <Select value={status} onChange={(e) => handleStatusChange(e.target.value)}>
        <option value="pending">Beklemede</option>
        <option value="approved">Onaylandı</option>
        <option value="rejected">Reddedildi</option>
      </Select>
      <Button onClick={() => handleStatusChange(status)}>Güncelle</Button>
    </StatusContainer>
  );
};

export default OfferStatus;
