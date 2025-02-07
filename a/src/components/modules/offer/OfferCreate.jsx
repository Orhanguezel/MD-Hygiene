// 📂 components/offer/OfferCreate.jsx
import { useState } from "react";
import { createOffer } from "../../api/offerApi";
import { useNavigate } from "react-router-dom";
import { FormContainer, Input, Button } from "../../styles/OfferStyles";

const OfferCreate = () => {
  const [customer, setCustomer] = useState("");
  const [total, setTotal] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createOffer({ customer, total, date, status: "Bekliyor" });
    navigate("/offers");
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>📄 Yeni Teklif Oluştur</h2>
      <Input type="text" placeholder="Müşteri Adı" value={customer} onChange={(e) => setCustomer(e.target.value)} required />
      <Input type="number" placeholder="Toplam (€)" value={total} onChange={(e) => setTotal(e.target.value)} required />
      <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <Button type="submit">Kaydet</Button>
    </FormContainer>
  );
};

export default OfferCreate;
