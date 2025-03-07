import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "@/features/products/productSlice";
import { fetchCategories } from "@/features/categories/categorySlice"; // ✅ Kategorileri çek
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { FormContainer, FormInput, SubmitButton } from "../styles/productStyles";

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, loading } = useSelector((state) => state.category);
  const { texts } = useLanguage();
  const { theme } = useTheme();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    stock: "",
    category: "",
    images: [""],
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "images" ? value.split(",") : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product.title || !product.price || !product.category) {
      toast.error("⚠️ Lütfen tüm alanları doldurun!");
      return;
    }

    dispatch(addProduct(product))
      .unwrap()
      .then(() => {
        toast.success("✅ Ürün başarıyla eklendi!");
        navigate("/products");
      })
      .catch(() => toast.error("❌ Ürün eklenirken hata oluştu!"));
  };

  return (
    <FormContainer theme={theme} onSubmit={handleSubmit}>
      <h2>{texts?.products?.addProduct || "🛒 Yeni Ürün Ekle"}</h2>

      <label>{texts?.products?.productName || "Ürün Adı"}:</label>
      <FormInput theme={theme} type="text" name="title" value={product.title} onChange={handleChange} required />

      <label>{texts?.products?.price || "Fiyat (₺)"}:</label>
      <FormInput theme={theme} type="number" name="price" value={product.price} onChange={handleChange} required />

      <label>{texts?.products?.stock || "Stok Adedi"}:</label>
      <FormInput theme={theme} type="number" name="stock" value={product.stock} onChange={handleChange} required />

      <label>{texts?.products?.category || "Kategori"}:</label>
      <select name="category" value={product.category} onChange={handleChange} required>
        <option value="">{texts?.products?.selectCategory || "Kategori Seç"}</option>
        {loading ? (
          <option disabled>{texts?.products?.loadingCategories || "Kategoriler yükleniyor..."}</option>
        ) : (
          categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))
        )}
      </select>

      <label>{texts?.products?.imageURL || "Ürün Resmi URL"}:</label>
      <FormInput theme={theme} type="text" name="images" value={product.images.join(",")} onChange={handleChange} required />

      <SubmitButton theme={theme} type="submit">
        {texts?.products?.submit || "Kaydet"}
      </SubmitButton>
    </FormContainer>
  );
};

export default ProductForm;
