import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "@/features/products/productSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { toast } from "react-toastify";
import { FormContainer, FormInput, SubmitButton } from "../styles/productStyles";

const ProductForm = () => {
  const dispatch = useDispatch();
  const { texts } = useLanguage();
  const { theme } = useTheme();

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(product));
    toast.success(texts.products.addSuccess || "✅ Ürün başarıyla eklendi!");
    setProduct({ name: "", brand: "", price: "", stock: "", image: "" });
  };

  return (
    <FormContainer theme={theme} onSubmit={handleSubmit}>
      <h2>{texts.products.addProduct || "🛒 Yeni Ürün Ekle"}</h2>

      <label>{texts.products.productName || "Ürün Adı"}:</label>
      <FormInput theme={theme} type="text" name="name" value={product.name} onChange={handleChange} required />

      <label>{texts.products.brand || "Marka"}:</label>
      <FormInput theme={theme} type="text" name="brand" value={product.brand} onChange={handleChange} required />

      <label>{texts.products.price || "Fiyat (₺)"}:</label>
      <FormInput theme={theme} type="number" name="price" value={product.price} onChange={handleChange} required />

      <label>{texts.products.stock || "Stok Adedi"}:</label>
      <FormInput theme={theme} type="number" name="stock" value={product.stock} onChange={handleChange} required />

      <label>{texts.products.image || "Ürün Resmi URL"}:</label>
      <FormInput theme={theme} type="text" name="image" value={product.image} onChange={handleChange} required />

      <SubmitButton theme={theme} type="submit">{texts.products.submit || "Kaydet"}</SubmitButton>
    </FormContainer>
  );
};

export default ProductForm;
