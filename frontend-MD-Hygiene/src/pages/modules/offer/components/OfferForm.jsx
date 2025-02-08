import React, { useState } from "react";

const OfferForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    iban: "DE90 2005 0550 1217 1389 89",
    bic: "HASPDEHHXXX",
    freight: 0,
    discount: 0,
    taxRate: 19,
    products: [
      { productName: "", quantity: 1, unitPrice: 0 },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      products: updatedProducts,
    }));
  };

  const addProduct = () => {
    setFormData((prevData) => ({
      ...prevData,
      products: [...prevData.products, { productName: "", quantity: 1, unitPrice: 0 }],
    }));
  };

  const removeProduct = (index) => {
    const updatedProducts = [...formData.products];
    updatedProducts.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      products: updatedProducts,
    }));
  };

  const calculateTotals = () => {
    const netAmount = formData.products.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
    const taxAmount = (netAmount * formData.taxRate) / 100;
    const grossAmount = netAmount + taxAmount - formData.discount;

    return { netAmount, taxAmount, grossAmount };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totals = calculateTotals();
    onSubmit({ ...formData, totals });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Teklif Formu</h2>

      <label>Firma Adı:</label>
      <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />

      <label>Yetkili Kişi:</label>
      <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />

      <label>IBAN:</label>
      <input type="text" name="iban" value={formData.iban} onChange={handleChange} />

      <label>BIC:</label>
      <input type="text" name="bic" value={formData.bic} onChange={handleChange} />

      <label>Taşıma Ücreti:</label>
      <input type="number" name="freight" value={formData.freight} onChange={handleChange} />

      <label>İndirim:</label>
      <input type="number" name="discount" value={formData.discount} onChange={handleChange} />

      <label>KDV Oranı (%):</label>
      <input type="number" name="taxRate" value={formData.taxRate} onChange={handleChange} />

      <h3>Ürünler</h3>
      {formData.products.map((product, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Ürün Adı"
            value={product.productName}
            onChange={(e) => handleProductChange(index, "productName", e.target.value)}
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
            placeholder="Birim Fiyat"
            value={product.unitPrice}
            onChange={(e) => handleProductChange(index, "unitPrice", e.target.value)}
            required
          />
          <button type="button" onClick={() => removeProduct(index)}>Sil</button>
        </div>
      ))}
      <button type="button" onClick={addProduct}>+ Ürün Ekle</button>

      <h3>Toplamlar:</h3>
      <p>Net Tutar: {calculateTotals().netAmount.toFixed(2)} €</p>
      <p>KDV Tutarı: {calculateTotals().taxAmount.toFixed(2)} €</p>
      <p>Brüt Tutar: {calculateTotals().grossAmount.toFixed(2)} €</p>

      <button type="submit">Teklif Oluştur</button>
    </form>
  );
};

export default OfferForm;
