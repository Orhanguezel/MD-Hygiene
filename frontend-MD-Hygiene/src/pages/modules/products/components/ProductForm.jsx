import React, { useState } from "react";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { FormContainer, FormInput, SubmitButton } from "../styles/productStyles";

const ProductForm = () => {
  const { texts } = useLanguage();
  const { theme } = useTheme();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ürün Eklendi:", product);
    alert(texts.products.addSuccess || "Ürün başarıyla eklendi!");
    setProduct({ name: "", price: "", stock: "" });
  };

  return (
    <FormContainer theme={theme} onSubmit={handleSubmit}>
      <label>{texts.products.productName || "Ürün Adı"}:</label>
      <FormInput
        theme={theme}
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        required
      />

      <label>{texts.products.price || "Fiyat (₺)"}:</label>
      <FormInput
        theme={theme}
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        required
      />

      <label>{texts.products.stock || "Stok Adedi"}:</label>
      <FormInput
        theme={theme}
        type="number"
        name="stock"
        value={product.stock}
        onChange={handleChange}
        required
      />

      <SubmitButton theme={theme} type="submit">
        {texts.products.submit || "Kaydet"}
      </SubmitButton>
    </FormContainer>
  );
};

export default ProductForm;

