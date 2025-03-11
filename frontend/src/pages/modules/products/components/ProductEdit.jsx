import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, updateProduct } from "@/features/products/productSlice";
import { fetchCategories } from "@/features/categories/categorySlice";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { toast } from "react-toastify";
import {
  EditFormContainer,
  EditFormInput,
  EditTextarea,
  EditSelect,
  EditLabel,
  EditSubmitButton,
  ImagePreviewContainer,
  ImagePreview,
  FileInput,
} from "../styles/productEditStyles"; // 📌 Stil dosyası

const ProductEdit = () => {
  const dispatch = useDispatch();
  const { texts } = useLanguage();
  const { theme } = useTheme();

  const { products, loading } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [],
  });
  const [newImages, setNewImages] = useState([]); // ✅ Yüklenen yeni resimler

  // ✅ Ürünleri ve kategorileri yükle
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  // ✅ Kategori değiştiğinde ürünleri filtrele
  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter((p) => String(p.category?._id) === String(selectedCategory));
      setFilteredProducts(filtered);
      setSelectedProduct(null); // Yeni kategori seçildiğinde ürünü sıfırla
    } else {
      setFilteredProducts([]);
      setSelectedProduct(null);
    }
  }, [selectedCategory, products]);

  // ✅ Ürün seçildiğinde formu doldur
  useEffect(() => {
    if (selectedProduct) {
      setProductData({
        title: selectedProduct.title,
        description: selectedProduct.description || "",
        price: selectedProduct.price,
        stock: selectedProduct.stock,
        category: selectedProduct.category?._id || "",
        images: selectedProduct.images || [],
      });
    }
  }, [selectedProduct]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleProductChange = (e) => {
    const product = filteredProducts.find((p) => String(p._id) === String(e.target.value));
    setSelectedProduct(product || null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: name === "images" ? value.split(",") : value,
    }));
  };

  // ✅ Resim Yükleme Fonksiyonu
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    
    setNewImages((prev) => [...prev, ...files]); // Yeni yüklenen dosyaları sakla
    setProductData((prev) => ({
      ...prev,
      images: [...prev.images, ...imageUrls], // Önizleme için güncelle
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      toast.error("⚠️ Güncellenecek bir ürün seçmelisiniz!");
      return;
    }

    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("stock", productData.stock);
    formData.append("category", productData.category);
    
    // ✅ Eski resimleri ekle
    productData.images.forEach((img, index) => {
      formData.append(`images[${index}]`, img);
    });

    // ✅ Yeni yüklenen dosyaları FormData'ya ekle
    newImages.forEach((file) => {
      formData.append("newImages", file);
    });

    dispatch(updateProduct({ id: selectedProduct._id, productData: formData }))
      .unwrap()
      .then(() => {
        toast.success("✅ Ürün başarıyla güncellendi!");
      })
      .catch(() => toast.error("❌ Ürün güncellenirken hata oluştu!"));
  };

  if (loading) return <p>{texts?.products?.loading || "Yükleniyor..."}</p>;

  return (
    <EditFormContainer theme={theme} onSubmit={handleSubmit}>
      <h2>{texts?.products?.editAll || "✏️ Ürünleri Güncelle"}</h2>

      {/* ✅ Kategori Seçme */}
      <EditLabel>{texts?.products?.category || "Kategori"}:</EditLabel>
      <EditSelect name="category" value={selectedCategory} onChange={handleCategoryChange} required>
        <option value="">{texts?.products?.selectCategory || "Kategori Seç"}</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </EditSelect>

      {/* ✅ Ürün Seçme */}
      {selectedCategory && filteredProducts.length > 0 && (
        <>
          <EditLabel>{texts?.products?.selectProduct || "Ürün Seç"}:</EditLabel>
          <EditSelect name="product" onChange={handleProductChange} required>
            <option value="">{texts?.products?.selectProduct || "Ürün Seç"}</option>
            {filteredProducts.map((product) => (
              <option key={product._id} value={product._id}>
                {product.title}
              </option>
            ))}
          </EditSelect>
        </>
      )}

      {/* ✅ Form */}
      {selectedProduct && (
        <>
          <EditLabel>{texts?.products?.productName || "Ürün Adı"}:</EditLabel>
          <EditFormInput theme={theme} type="text" name="title" value={productData.title} onChange={handleChange} required />

          <EditLabel>{texts?.products?.description || "Açıklama"}:</EditLabel>
          <EditTextarea theme={theme} name="description" value={productData.description} onChange={handleChange} />

          <EditLabel>{texts?.products?.price || "Fiyat (₺)"}:</EditLabel>
          <EditFormInput theme={theme} type="number" name="price" value={productData.price} onChange={handleChange} required />

          <EditLabel>{texts?.products?.stock || "Stok Adedi"}:</EditLabel>
          <EditFormInput theme={theme} type="number" name="stock" value={productData.stock} onChange={handleChange} required />

          {/* ✅ Mevcut Resimleri Göster */}
          <EditLabel>{texts?.products?.imageURL || "Ürün Resmi URL"}:</EditLabel>
          <EditFormInput theme={theme} type="text" name="images" value={productData.images.join(",")} onChange={handleChange} required />

          <ImagePreviewContainer>
            {productData.images.map((img, index) => (
              <ImagePreview key={index} src={img} alt={`Product ${index}`} />
            ))}
          </ImagePreviewContainer>

          {/* ✅ Yeni Resim Yükleme */}
          <EditLabel>{texts?.products?.uploadImage || "Dosyadan Resim Yükle"}:</EditLabel>
          <FileInput type="file" multiple onChange={handleImageUpload} />
          

          <EditSubmitButton theme={theme} type="submit">
            {texts?.products?.update || "Güncelle"}
          </EditSubmitButton>
        </>
      )}
    </EditFormContainer>
  );
};

export default ProductEdit;
