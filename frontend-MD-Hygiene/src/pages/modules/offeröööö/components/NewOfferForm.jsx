import { useState } from "react";
import { useOffers } from "@/context/OfferContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  OfferFormContainer,
  FormGroup,
  Label,
  Input,
  Button,
  ProductList,
  ProductItem,
  TotalAmount
} from "./styles/offerStyles";

const NewOfferForm = () => {
  const { addOffer } = useOffers();
  const { texts } = useLanguage();

  const [offer, setOffer] = useState({
    customer: "",
    products: [],
    taxRate: 19,
    shippingCost: 0,
  });

  const [product, setProduct] = useState({ name: "", quantity: 1, unitPrice: 0 });

  const handleProductAdd = () => {
    setOffer((prev) => ({
      ...prev,
      products: [...prev.products, product],
    }));
    setProduct({ name: "", quantity: 1, unitPrice: 0 });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOffer((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    const subtotal = offer.products.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
    const tax = (subtotal * offer.taxRate) / 100;
    return subtotal + tax + Number(offer.shippingCost);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOffer({ ...offer, totalAmount: calculateTotal() });
  };

  return (
    <OfferFormContainer>
      <h2>{texts.offer.newOffer || "Yeni Teklif Oluştur"}</h2>

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>{texts.offer.customer}</Label>
          <Input
            type="text"
            name="customer"
            value={offer.customer}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>{texts.offer.product}</Label>
          <Input
            type="text"
            name="name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            placeholder="Ürün Adı"
          />
          <Input
            type="number"
            name="quantity"
            value={product.quantity}
            min="1"
            onChange={(e) => setProduct({ ...product, quantity: Number(e.target.value) })}
            placeholder="Adet"
          />
          <Input
            type="number"
            name="unitPrice"
            value={product.unitPrice}
            min="0"
            onChange={(e) => setProduct({ ...product, unitPrice: Number(e.target.value) })}
            placeholder="Birim Fiyat"
          />
          <Button type="button" onClick={handleProductAdd}>
            {texts.offer.addProduct || "Ürün Ekle"}
          </Button>
        </FormGroup>

        <ProductList>
          {offer.products.map((item, index) => (
            <ProductItem key={index}>
              {item.name} - {item.quantity} x {item.unitPrice} ₺
            </ProductItem>
          ))}
        </ProductList>

        <FormGroup>
          <Label>{texts.offer.taxRate || "KDV Oranı (%)"}</Label>
          <Input
            type="number"
            name="taxRate"
            value={offer.taxRate}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>{texts.offer.shippingCost || "Taşıma Ücreti"}</Label>
          <Input
            type="number"
            name="shippingCost"
            value={offer.shippingCost}
            onChange={handleChange}
          />
        </FormGroup>

        <TotalAmount>
          {texts.offer.totalAmount || "Toplam Tutar"}: {calculateTotal()} ₺
        </TotalAmount>

        <Button type="submit">{texts.offer.save || "Kaydet"}</Button>
      </form>
    </OfferFormContainer>
  );
};

export default NewOfferForm;
