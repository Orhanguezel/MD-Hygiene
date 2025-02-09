import React, { useState } from "react";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { ProductFormContainer, FormInput, ActionButton } from "../styles/offerStyles";

const AddProduct = () => {
  const [product, setProduct] = useState({ name: "", quantity: 1, price: "" });
  const { texts } = useLanguage();
  const { theme } = useTheme();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ürün Eklendi:", product);
    alert(texts?.products?.addSuccess || "Ürün başarıyla eklendi!");
  };

  return (
    <ProductFormContainer theme={theme}>
      <h2>{texts?.products?.addProduct || "Ürün Ekle"}</h2>
      <form onSubmit={handleSubmit}>
        <label>{texts?.products?.productName || "Ürün Adı"}:</label>
        <FormInput theme={theme} type="text" name="name" value={product.name} onChange={handleChange} required />

        <label>{texts?.products?.quantity || "Adet"}:</label>
        <FormInput theme={theme} type="number" name="quantity" value={product.quantity} onChange={handleChange} min="1" required />

        <label>{texts?.products?.unitPrice || "Birim Fiyat (₺)"}:</label>
        <FormInput theme={theme} type="number" name="price" value={product.price} onChange={handleChange} required />

        <ActionButton type="submit">{texts?.products?.add || "Ürün Ekle"}</ActionButton>
      </form>
    </ProductFormContainer>
  );
};

export default AddProduct;
