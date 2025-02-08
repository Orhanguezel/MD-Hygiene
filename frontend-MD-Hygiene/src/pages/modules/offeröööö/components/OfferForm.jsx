import { useState } from "react";
import { useOffers } from "@/context/OfferContext";
import { FormContainer, Input, Button } from "./styles/offerStyles";

const OfferForm = () => {
  const { addOffer } = useOffers();
  const [formData, setFormData] = useState({
    user: "",
    items: [{ product: "", quantity: 1, unitPrice: 0 }],
    totalAmount: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOffer({ ...formData, id: Date.now().toString(), status: "pending" });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input type="text" name="user" placeholder="Müşteri Adı" onChange={handleChange} required />
      <Input type="number" name="totalAmount" placeholder="Toplam Tutar" onChange={handleChange} required />
      <Button type="submit">Teklif Oluştur</Button>
    </FormContainer>
  );
};

export default OfferForm;
