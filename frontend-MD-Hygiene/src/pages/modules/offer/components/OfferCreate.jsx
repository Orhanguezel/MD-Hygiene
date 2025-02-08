import React, { useState } from "react";
import { useOffers } from "@/context/OfferContext";

const OfferCreate = () => {
  const { addOffer } = useOffers();
  const [formData, setFormData] = useState({
    customer: "",
    products: [{ name: "", quantity: 1, unitPrice: 0 }],
    shippingCost: 0,
    status: "pending"
  });

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index][field] = value;
    setFormData({ ...formData, products: updatedProducts });
  };

  const addProductField = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { name: "", quantity: 1, unitPrice: 0 }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalAmount = formData.products.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
    const newOffer = {
      id: `OFF-${Math.floor(Math.random() * 1000)}`,
      ...formData,
      totalAmount: totalAmount + formData.shippingCost
    };
    addOffer(newOffer);
    setFormData({ customer: "", products: [{ name: "", quantity: 1, unitPrice: 0 }], shippingCost: 0 });
  };

  return (
    <div>
      <h2>Yeni Teklif Oluştur</h2>
      <form onSubmit={handleSubmit}>
        <label>Müşteri Adı:</label>
        <input
          type="text"
          value={formData.customer}
          onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
          required
        />

        <h3>Ürünler</h3>
        {formData.products.map((product, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Ürün Adı"
              value={product.name}
              onChange={(e) => handleProductChange(index, "name", e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Adet"
              value={product.quantity}
              onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Birim Fiyat (₺)"
              value={product.unitPrice}
              onChange={(e) => handleProductChange(index, "unitPrice", e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addProductField}>
          + Ürün Ekle
        </button>

        <label>Nakliye Ücreti (₺):</label>
        <input
          type="number"
          value={formData.shippingCost}
          onChange={(e) => setFormData({ ...formData, shippingCost: Number(e.target.value) })}
        />

        <button type="submit">Teklif Kaydet</button>
      </form>
    </div>
  );
};

export default OfferCreate;
