import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, fetchProducts } from "@/features/products/productSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { FormContainer, FormInput, SubmitButton } from "../styles/productStyles";

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.product);
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
    dispatch(fetchProducts()); // 📌 Ürünleri Redux Store'dan al (Kategorileri içeren)
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setProduct({ ...product, category: parseInt(value) }); // 📌 Kategori ID'sini integer olarak kaydet
    } else if (name === "images") {
      setProduct({ ...product, images: [value] }); // 📌 Resim URL'sini diziye çevir
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product.title || !product.price || !product.category) {
      toast.error(texts?.products?.error || "Lütfen tüm alanları doldurun!");
      return;
    }

    const categoryObject = products
      .map((p) => p.category)
      .find((cat) => cat.id === parseInt(product.category)) || { id: 1, name: "Genel", image: "" };

    const newProductData = {
      ...product,
      price: parseFloat(product.price),
      stock: parseInt(product.stock),
      category: categoryObject,
      images: product.images.length > 0 ? product.images : ["/placeholder.jpg"],
    };

    console.log("📌 Gönderilecek Ürün:", newProductData); // 🔍 API'ye gönderilecek veriyi kontrol et

    dispatch(addProduct(newProductData))
      .unwrap()
      .then(() => {
        toast.success(texts?.products?.addSuccess || "✅ Ürün başarıyla eklendi!");
        navigate("/products"); // ✅ Listeye yönlendir
      })
      .catch(() => toast.error(texts?.products?.addError || "❌ Ürün eklenirken hata oluştu!"));

    setProduct({
      title: "",
      price: "",
      stock: "",
      category: "",
      images: [""],
    });
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
      <select name="category" value={product.category || ""} onChange={handleChange} required>
        <option value="">{texts?.products?.selectCategory || "Kategori Seç"}</option>
        {products.length > 0 ? (
          products
            .map((p) => p.category)
            .filter((category, index, self) => 
              category && self.findIndex(c => c.id === category.id) === index
            )
            .map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
        ) : (
          <option disabled>{texts?.products?.loadingCategories || "Kategoriler yükleniyor..."}</option>
        )}
      </select>

      <label>{texts?.products?.imageURL || "Ürün Resmi URL"}:</label>
      <FormInput theme={theme} type="text" name="images" value={product.images[0]} onChange={handleChange} required />

      <SubmitButton theme={theme} type="submit">{texts?.products?.submit || "Kaydet"}</SubmitButton>
    </FormContainer>
  );
};

export default ProductForm;
