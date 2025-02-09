// ✅ src/pages/products/AddProduct.jsx
import { useState } from "react";
import { useProducts } from "@/features/products/useProducts";
import { useLanguage } from "@/features/language/useLanguage";
import { FormContainer, ErrorMessage, SubmitButton } from "../styles/productStyles";

const AddProduct = () => {
  const { addProduct } = useProducts();
  const { texts } = useLanguage();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    brand: "",
    price: "",
    stock: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.brand || !formData.price || !formData.stock) {
      setError(texts?.products?.error || "Lütfen tüm alanları doldurun.");
      return;
    }
    addProduct(formData);
    setFormData({ id: "", name: "", brand: "", price: "", stock: "" });
    setError("");
  };

  return (
    <FormContainer>
      <h2>{texts?.products?.addProduct || "🛒 Yeni Ürün Ekle"}</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="Ürün ID" value={formData.id} onChange={handleChange} required />
        <input type="text" name="name" placeholder="Ürün Adı" value={formData.name} onChange={handleChange} required />
        <input type="text" name="brand" placeholder="Marka" value={formData.brand} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Fiyat (€)" value={formData.price} onChange={handleChange} required />
        <input type="number" name="stock" placeholder="Stok" value={formData.stock} onChange={handleChange} required />

        <SubmitButton type="submit">💾 {texts?.products?.save || "Kaydet"}</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default AddProduct;