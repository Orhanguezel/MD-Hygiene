// Güncellenmiş dosya: AddProduct.jsx

import { useState } from "react";
import { useLanguage } from "@/features/language/useLanguage"; // ✅ Dil desteği eklendi
import { useTheme } from "@/features/theme/useTheme";         // ✅ Tema desteği eklendi

const AddProduct = ({ onAddProduct }) => {
  const [product, setProduct] = useState({ name: "", quantity: 1, price: "" });
  const { texts } = useLanguage(); // ✅ Dil kullanımı
  const { theme } = useTheme();    // ✅ Tema kullanımı

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(product);
    alert(texts?.products?.addSuccess || "Ürün başarıyla eklendi!"); // ✅ Çok dilli bildirim
    setProduct({ name: "", quantity: 1, price: "" }); // Formu sıfırla
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff", padding: "20px" }}>
      <label>{texts?.products?.name || "Ürün Adı"}:</label>
      <input type="text" name="name" value={product.name} onChange={handleChange} required />

      <label>{texts?.products?.quantity || "Adet"}:</label>
      <input type="number" name="quantity" value={product.quantity} onChange={handleChange} min="1" required />

      <label>{texts?.products?.price || "Birim Fiyat (₺)"}:</label>
      <input type="number" name="price" value={product.price} onChange={handleChange} required />

      <button type="submit" style={{ backgroundColor: theme === "dark" ? "#4CAF50" : "#007BFF", color: "#fff" }}>
        {texts?.products?.addButton || "Ürün Ekle"}
      </button>
    </form>
  );
};

export default AddProduct; 
