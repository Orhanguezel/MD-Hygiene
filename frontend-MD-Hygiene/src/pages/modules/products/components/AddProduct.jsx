import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";

const AddProduct = () => {
  const { addProduct } = useProducts();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    brand: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(formData);
    setFormData({ id: "", name: "", brand: "", price: "", stock: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Yeni Ürün Ekle</h2>
      <input type="text" name="id" placeholder="Ürün ID" onChange={handleChange} required />
      <input type="text" name="name" placeholder="Ürün Adı" onChange={handleChange} required />
      <input type="text" name="brand" placeholder="Marka" onChange={handleChange} required />
      <input type="number" name="price" placeholder="Fiyat (€)" onChange={handleChange} required />
      <input type="number" name="stock" placeholder="Stok" onChange={handleChange} required />
      <button type="submit">Kaydet</button>
    </form>
  );
};

export default AddProduct;
