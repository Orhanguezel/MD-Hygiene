import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "@/features/products/productSlice";
import { fetchCategories } from "@/features/categories/categorySlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import {
  FormContainer,
  FormInput,
  FormTextarea,
  SubmitButton,
  ImagePreviewContainer,
  ImagePreview,
  FileInputContainer,
  HiddenFileInput,
  FileUploadButton,
  RemoveImageButton,
} from "../styles/productStyles";

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, loading } = useSelector((state) => state.category);
  const { texts } = useLanguage();
  const { theme } = useTheme();

  const fileInputRef = useRef(null);

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [],
  });

  const [newImages, setNewImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "images") {
      const trimmedValue = value.trim();
      setProduct((prev) => ({
        ...prev,
        images: trimmedValue ? trimmedValue.split(",").map((url) => url.trim()) : [],
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ✅ Resim Yükleme Fonksiyonu
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).filter((file) => file.type.startsWith("image/"));

    if (files.length === 0) {
      toast.error("⚠️ Geçerli bir resim dosyası seçin!");
      return;
    }

    if (newImages.length + files.length > 5) {
      toast.error("⚠️ En fazla 5 resim yükleyebilirsiniz!");
      return;
    }

    previewImages.forEach((url) => URL.revokeObjectURL(url));

    const imageUrls = files.map((file) => URL.createObjectURL(file));

    setNewImages((prev) => [...prev, ...files]);
    setPreviewImages((prev) => [...prev, ...imageUrls]);
  };

  // ✅ Resmi Silme Fonksiyonu
  const handleRemoveImage = (index, type) => {
    if (type === "url") {
      setProduct((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    } else if (type === "file") {
      URL.revokeObjectURL(previewImages[index]);
      setNewImages((prev) => prev.filter((_, i) => i !== index));
      setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // ✅ Dosya Seç Butonunu Tetikleme
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("📌 Form Gönderme Başlatıldı!");
    console.log("📋 Mevcut Ürün Verisi:", product);
  
    if (!product.title || !product.price || !product.stock || !product.category) {
      toast.error("⚠️ Lütfen tüm alanları doldurun!");
      return;
    }
  
    const categoryId = product.category?.trim();
    if (!categoryId || categoryId === "") {
      console.error("❌ Kategori ID eksik!");
      toast.error("⚠️ Kategori seçmelisiniz!");
      return;
    }
  
    console.log("📌 Kategori ID:", categoryId);
  
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description || "");
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("category", categoryId);
  
    // ✅ URL ile eklenen resimleri FormData'ya ekle
    if (Array.isArray(product.images) && product.images.length > 0) {
      product.images.forEach((img, index) => {
        if (img.startsWith("http")) {
          formData.append(`existingImages[${index}]`, img);
        }
      });
    }
  
    // ✅ Dosya olarak yüklenen resimleri FormData'ya ekle
    if (newImages.length > 0) {
      newImages.forEach((file) => {
        formData.append("images", file);
      });
    }
  
    console.log("📤 API'ye Gidecek FormData İçeriği:");
    for (let pair of formData.entries()) {
      console.log(`🔍 ${pair[0]}:`, pair[1]);
    }
  
    try {
      await dispatch(addProduct(formData)).unwrap();
      toast.success("✅ Ürün başarıyla eklendi!");
      navigate("/products");
  
      // ✅ Form verilerini sıfırla
      if (fileInputRef.current) fileInputRef.current.value = "";
      previewImages.forEach((url) => URL.revokeObjectURL(url));
      setPreviewImages([]);
      setNewImages([]);
    } catch (error) {
      console.error("❌ Ürün eklenirken hata oluştu!", error);
      toast.error("❌ Ürün eklenirken hata oluştu!");
    }
  };
  

  return (
    <FormContainer theme={theme} onSubmit={handleSubmit}>
      <h2>{texts?.products?.addProduct || "🛒 Yeni Ürün Ekle"}</h2>

      <label>{texts?.products?.productName || "Ürün Adı"}:</label>
      <FormInput theme={theme} type="text" name="title" value={product.title} onChange={handleChange} required />

      <label>{texts?.products?.description || "Açıklama"}:</label>
      <FormTextarea theme={theme} name="description" value={product.description} onChange={handleChange} />

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

      {/* ✅ Mevcut Resimleri Göster */}
      <label>{texts?.products?.imageURL || "Ürün Resmi URL"}:</label>
      <FormInput theme={theme} type="text" name="images" value={product.images.join(",")} onChange={handleChange} />

      <ImagePreviewContainer>
        {product.images.map((img, index) => (
          <div key={index}>
            <ImagePreview src={img} alt={`Product ${index}`} />
            <RemoveImageButton onClick={() => handleRemoveImage(index, "url")}>❌</RemoveImageButton>
          </div>
        ))}
      </ImagePreviewContainer>

      <FileInputContainer>
        <HiddenFileInput ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleImageUpload} />
        <FileUploadButton type="button" onClick={triggerFileInput}>
          📤 {texts?.products?.chooseFile || "Dosya Seç"}
        </FileUploadButton>
      </FileInputContainer>

      <ImagePreviewContainer>
        {previewImages.map((img, index) => (
          <div key={index}>
            <ImagePreview src={img} alt={`Uploaded ${index}`} />
            <RemoveImageButton onClick={() => handleRemoveImage(index, "file")}>❌</RemoveImageButton>
          </div>
        ))}
      </ImagePreviewContainer>

      <SubmitButton theme={theme} type="submit">
        {texts?.products?.submit || "Kaydet"}
      </SubmitButton>
    </FormContainer>
  );
};

export default ProductForm;
