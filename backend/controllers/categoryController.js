import mongoose from "mongoose";
import Category from "../models/Category.js";
import Product from "../models/Product.js"; // ✅ Ürünleri kontrol etmek için
import asyncHandler from "express-async-handler"; // ✅ Hata yönetimi için

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
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error("❌ Geçersiz kategori ID:", id);
    return res.status(400).json({ message: "Geçersiz kategori ID!" });
  }

  const category = await Category.findById(id);

  if (!category) {
    console.error("❌ Kategori bulunamadı:", id);
    return res.status(404).json({ message: "Kategori bulunamadı!" });
  }

  res.json(category);
});

// ✅ **Belirli bir kategoriyi güncelle**
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, image } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error("❌ Geçersiz kategori ID:", id);
    return res.status(400).json({ message: "Geçersiz kategori ID!" });
  }

  const category = await Category.findById(id);

  if (!category) {
    console.error("❌ Kategori bulunamadı:", id);
    return res.status(404).json({ message: "Kategori bulunamadı!" });
  }

  category.name = name || category.name;
  category.image = image || category.image;
  
  const updatedCategory = await category.save();
  console.log("✅ Kategori Güncellendi:", updatedCategory);
  res.json(updatedCategory);
});

// ✅ **Belirli bir kategoriyi sil**
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error("❌ Geçersiz kategori ID:", id);
    return res.status(400).json({ message: "Geçersiz kategori ID!" });
  }

  console.log("🗑️ Silme işlemi başlatıldı:", id);

  // **Bu kategoriye bağlı ürün var mı kontrol et**
  const products = await Product.find({ category: id });

  if (products.length > 0) {
    console.error("❌ Kategoriye bağlı ürünler var, silinemiyor:", id);
    return res.status(400).json({ message: "Bu kategoriye bağlı ürünler olduğu için silinemiyor!" });
  }

  const deletedCategory = await Category.findByIdAndDelete(id);
  if (!deletedCategory) {
    console.error("❌ Silme işlemi başarısız, kategori bulunamadı:", id);
    return res.status(404).json({ message: "Kategori bulunamadı!" });
  }

  console.log("✅ Kategori Başarıyla Silindi:", deletedCategory);
  res.json({ message: "Kategori başarıyla silindi" });
});
