// src/pages/modules/offer/components/AddProduct.jsx
import React, { useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    quantity: 1,
    price: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ürün Eklendi:", product);
    alert("Ürün başarıyla eklendi!");
  };

  return (
    <div>
      <h2>Ürün Ekle</h2>
      <form onSubmit={handleSubmit}>
        <label>Ürün Adı:</label>
        <input type="text" name="name" value={product.name} onChange={handleChange} required />

        <label>Adet:</label>
        <input type="number" name="quantity" value={product.quantity} onChange={handleChange} min="1" required />

        <label>Birim Fiyat (₺):</label>
        <input type="number" name="price" value={product.price} onChange={handleChange} required />

        <button type="submit">Ürün Ekle</button>
      </form>
    </div>
  );
};

export default AddProduct;
