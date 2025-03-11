import { useEffect, useState } from "react";
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
} from "../styles/categoriesStyles";

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);
  const { texts } = useLanguage();
  const { theme } = useTheme();

  const [formData, setFormData] = useState({ name: "", image: "" });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.image) {
      toast.error(texts.categoryManagement.error);
      return;
    }

    if (editMode) {
      dispatch(updateCategory({ id: editId, categoryData: formData }));
      toast.success(texts.categoryManagement.successUpdate);
    } else {
      dispatch(addCategory(formData));
      toast.success(texts.categoryManagement.successAdd);
    }

    setFormData({ name: "", image: "" });
    setEditMode(false);
  };

  const handleDelete = (id) => {
    if (window.confirm(texts.categoryManagement.confirmDelete)) {
      dispatch(deleteCategory(id));
      toast.warn(texts.categoryManagement.successDelete);
    }
  };

  const handleEdit = (category) => {
    setFormData({ name: category.name, image: category.image });
    setEditMode(true);
    setEditId(category._id);
  };

  if (loading) return <p>{texts.categoryManagement.loading}</p>;
  if (error) return <p style={{ color: "red" }}>{texts.categoryManagement.error}</p>;

  return (
    <CategoryContainer theme={theme}>
      <h2>{texts.categoryManagement.title}</h2>

      {/* Kategori Ekleme Formu */}
      <CategoryForm onSubmit={handleSubmit} theme={theme}>
        <InputField
          type="text"
          placeholder={texts.categoryManagement.categoryName}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          theme={theme}
        />
        <InputField
          type="text"
          placeholder={texts.categoryManagement.categoryImage}
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          theme={theme}
        />
        <SubmitButton type="submit" theme={theme}>
          {editMode ? texts.categoryManagement.updateCategory : texts.categoryManagement.addCategory}
        </SubmitButton>
      </CategoryForm>

      {/* Kategori Listesi */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {categories.map((category) => (
          <CategoryCard key={category._id} theme={theme}>
            <CategoryImage src={category.image} alt={category.name} />
            <CategoryTitle>{category.name}</CategoryTitle>

            {/* ✅ Butonları iç içe koymamak için <div> kullanıldı */}
            <div style={{ display: "flex", gap: "10px" }}>
              <EditButton onClick={() => handleEdit(category)} theme={theme}>
                ✏️ {texts.categoryManagement.updateCategory}
              </EditButton>
              <DeleteButton onClick={() => handleDelete(category._id)} theme={theme}>
                🗑️ {texts.categoryManagement.deleteCategory}
              </DeleteButton>
            </div>
          </CategoryCard>
        ))}
      </div>
    </CategoryContainer>
  );
};

export default CategoryManagement;
