import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";

const ProductForm = () => {
  const { addProduct } = useProducts();
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    brand: "",
    price: "",
    stock: ""
  });

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ ...newProduct, id: Date.now().toString() });
    setNewProduct({ id: "", name: "", brand: "", price: "", stock: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Yeni Ürün Ekle</h3>
      <input type="text" name="name" placeholder="Ürün Adı" value={newProduct.name} onChange={handleChange} required />
      <input type="text" name="brand" placeholder="Marka" value={newProduct.brand} onChange={handleChange} required />
      <input type="number" name="price" placeholder="Fiyat" value={newProduct.price} onChange={handleChange} required />
      <input type="number" name="stock" placeholder="Stok" value={newProduct.stock} onChange={handleChange} required />
      <button type="submit">Ürün Ekle</button>
    </form>
  );
};

export default ProductForm;
