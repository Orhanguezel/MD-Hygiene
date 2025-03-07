import Category from "../models/Category.js";
import asyncHandler from "express-async-handler"; // Hata yönetimi için

// ✅ **Tüm kategorileri getir**
export const fetchCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

// ✅ **Yeni kategori oluştur**
export const createCategory = asyncHandler(async (req, res) => {
  const { name, image } = req.body;

  if (!name || !image) {
    return res.status(400).json({ message: "Kategori adı ve resmi zorunludur!" });
  }

  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    return res.status(400).json({ message: "Bu kategori zaten mevcut!" });
  }

  const category = new Category({ name, image });
  const createdCategory = await category.save();

  res.status(201).json(createdCategory);
});

// ✅ **Belirli bir kategoriyi getir**
export const getCategoryById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Geçersiz kategori ID!" });
  }

  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ message: "Kategori bulunamadı!" });
  }

  res.json(category);
});

// ✅ **Belirli bir kategoriyi güncelle**
export const updateCategory = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Geçersiz kategori ID!" });
  }

  const { name, image } = req.body;
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ message: "Kategori bulunamadı!" });
  }

  category.name = name || category.name;
  category.image = image || category.image;
  
  const updatedCategory = await category.save();
  res.json(updatedCategory);
});

// ✅ **Belirli bir kategoriyi sil**
export const deleteCategory = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Geçersiz kategori ID!" });
  }

  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: "Kategori bulunamadı!" });

  await category.deleteOne();
  res.json({ message: "Kategori başarıyla silindi!" });
});
