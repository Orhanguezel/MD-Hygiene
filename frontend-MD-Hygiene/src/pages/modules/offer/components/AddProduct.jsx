import { useState } from "react";

const AddProduct = ({ onAddProduct }) => {
  const [product, setProduct] = useState({ name: "", quantity: 1, price: "" });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(product);
    alert("Ürün başarıyla eklendi!");
    setProduct({ name: "", quantity: 1, price: "" }); // Formu sıfırla
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Ürün Adı:</label>
      <input type="text" name="name" value={product.name} onChange={handleChange} required />

      <label>Adet:</label>
      <input type="number" name="quantity" value={product.quantity} onChange={handleChange} min="1" required />

      <label>Birim Fiyat (₺):</label>
      <input type="number" name="price" value={product.price} onChange={handleChange} required />

      <button type="submit">Ürün Ekle</button>
    </form>
  );
};

export default AddProduct;
