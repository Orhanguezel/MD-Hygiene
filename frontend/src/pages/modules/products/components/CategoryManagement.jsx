import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "@/features/categories/categorySlice";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { toast } from "react-toastify";
import {
  CategoryContainer,
  CategoryCard,
  CategoryImage,
  CategoryTitle,
  CategoryForm,
  InputField,
  SubmitButton,
  DeleteButton,
  EditButton,
  ImagePreviewContainer,
  ImagePreview,
  FileUploadButton,
  HiddenFileInput,
} from "../styles/categoriesStyles";

const BASE_URL = "http://localhost:5010";

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);
  const { texts } = useLanguage();
  const { theme } = useTheme();

  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", image: "" });
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setNewImage(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      toast.error("⚠️ Lütfen geçerli bir resim dosyası seçin!");
    }
  };

  const handleRemoveImage = () => {
    setNewImage(null);
    setPreviewImage(null);
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.name || (!formData.image && !newImage)) {
      toast.error("⚠️ Lütfen tüm alanları doldurun!");
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
  
    if (newImage) {
      formDataToSend.append("image", newImage);
    } else {
      formDataToSend.append("image", formData.image);
    }
  
    // 📌 **FormData İçeriğini Konsola Yazdır**
    console.log("📤 API'ye Gidecek FormData İçeriği:");
    for (let pair of formDataToSend.entries()) {
      console.log(`🔍 ${pair[0]}:`, pair[1]);
    }
  
    try {
      if (editMode) {
        await dispatch(updateCategory({ id: editId, categoryData: formDataToSend })).unwrap();
        toast.success("✅ Kategori başarıyla güncellendi!");
      } else {
        await dispatch(addCategory(formDataToSend)).unwrap();
        toast.success("✅ Kategori başarıyla eklendi!");
      }
  
      setFormData({ name: "", image: "" });
      setNewImage(null);
      setPreviewImage(null);
      setEditMode(false);
    } catch (error) {
      toast.error(`❌ Hata: ${error}`);
    }
  };
  

  const handleDelete = async (id) => {
    if (window.confirm("⚠️ Bu kategoriyi silmek istediğinize emin misiniz?")) {
      try {
        await dispatch(deleteCategory(id)).unwrap();
        toast.warn("🗑️ Kategori başarıyla silindi!");
      } catch (error) {
        toast.error(`❌ Hata: ${error}`);
      }
    }
  };

  const handleEdit = (category) => {
    setFormData({ name: category.name, image: category.image });
    setPreviewImage(category.image.startsWith("/uploads/") ? `${BASE_URL}${category.image}` : category.image);
    setEditMode(true);
    setEditId(category._id);
  };

  return (
    <CategoryContainer theme={theme}>
      <h2>{texts.categoryManagement.title}</h2>

      <CategoryForm onSubmit={handleSubmit} theme={theme}>
        <InputField
          type="text"
          placeholder="Kategori Adı"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          theme={theme}
        />

        <InputField
          type="text"
          placeholder="Resim URL'si (Opsiyonel)"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          theme={theme}
        />

        <FileUploadButton type="button" onClick={() => fileInputRef.current.click()}>
          📤 Dosya Seç
        </FileUploadButton>
        <HiddenFileInput ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} />

        {previewImage && (
          <ImagePreviewContainer>
            <ImagePreview src={previewImage} alt="Önizleme" />
            <button type="button" onClick={handleRemoveImage}>❌</button>
          </ImagePreviewContainer>
        )}

        <SubmitButton type="submit" theme={theme}>
          {editMode ? "Güncelle" : "Ekle"}
        </SubmitButton>
      </CategoryForm>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {categories.map((category) => (
          <CategoryCard key={category._id} theme={theme}>
            <CategoryImage src={category.image.startsWith("/uploads/") ? `${BASE_URL}${category.image}` : category.image} alt={category.name} />
            <CategoryTitle>{category.name}</CategoryTitle>
            <div style={{ display: "flex", gap: "10px" }}>
              <EditButton onClick={() => handleEdit(category)} theme={theme}>✏️ Güncelle</EditButton>
              <DeleteButton onClick={() => handleDelete(category._id)} theme={theme}>🗑️ Sil</DeleteButton>
            </div>
          </CategoryCard>
        ))}
      </div>
    </CategoryContainer>
  );
};

export default CategoryManagement;
