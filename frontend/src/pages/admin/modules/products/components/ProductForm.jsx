import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "@/features/products/productSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { toast } from "react-toastify";
import { FormContainer, FormInput, SubmitButton, SelectInput } from "../styles/productStyles";

const ProductForm = () => {
  const dispatch = useDispatch();
  const { texts } = useLanguage();
  const { theme } = useTheme();
  const { categories } = useSelector((state) => state.product);

  const [product, setProduct] = useState({
    title: "",
    price: "",
    stock: 0,
    images: [""],
    category: categories.length > 0 ? categories[0] : { id: "", name: "", image: "" },
    description: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find((cat) => cat.id === parseInt(e.target.value));
    setProduct({ ...product, category: selectedCategory });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(product));
    toast.success("✅ Ürün başarıyla eklendi!");

    setProduct({
      title: "",
      price: "",
      stock: 0,
      images: [""],
      category: categories.length > 0 ? categories[0] : { id: "", name: "", image: "" },
      description: "",
    });
  };

  return (
    <FormContainer theme={theme} onSubmit={handleSubmit}>
      <h2>{texts.products.addProduct || "🛒 Yeni Ürün Ekle"}</h2>
      <SelectInput name="category" onChange={handleCategoryChange}>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </SelectInput>
      <SubmitButton theme={theme} type="submit">{texts.products.submit || "Kaydet"}</SubmitButton>
    </FormContainer>
  );
};

export default ProductForm;
