import Product from "../models/Product.js";
import Category from "../models/Category.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose"; // ObjectId dönüşümü için eklenmeli

// 📌 **Tüm ürünleri getirirken kategoriyi de ilişkilendiriyoruz!**
export const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().populate({
      path: "category",
      select: "name image", // Sadece gerekli alanları getir
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Ürünler getirilemedi", error });
  }
});

// 📌 **Yeni ürün oluştur (Admin)**
export const createProduct = asyncHandler(async (req, res) => {
  console.log("📌 Backend'e Gelen Veri:", req.body); // Debug için

  const { title, description, price, stock, category } = req.body;
  const images = req.files ? req.files.map((file) => file.path) : [];

  // ✅ **Zorunlu alan kontrolü**
  if (!title || !price || !stock || !category) {
    return res.status(400).json({ message: "Lütfen tüm zorunlu alanları doldurun!" });
  }

  // ✅ **Kategori ID'sinin geçerli ObjectId olup olmadığını kontrol et**
  if (!mongoose.Types.ObjectId.isValid(category)) {
    return res.status(400).json({ message: "Geçersiz kategori ID!" });
  }

  // ✅ **Kategori veritabanında var mı kontrol et**
  const existingCategory = await Category.findById(category);
  if (!existingCategory) {
    return res.status(400).json({ message: "Kategori bulunamadı!" });
  }

  const newProduct = new Product({
    title,
    description,
    price,
    stock,
    category: category, // ✅ `new mongoose.Schema.Types.ObjectId(category)` YANLIŞTI!
    images,
  });

  await newProduct.save();
  res.status(201).json(newProduct);
});

// 📌 **Belirli bir ürünü getir (Kategori bilgileriyle birlikte)**
export const getProductById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Geçersiz ürün ID!" });
  }

  const product = await Product.findById(req.params.id)
    .populate("category", "name image") // ✅ Seçili alanları getiriyoruz
    .select("-__v");

  if (!product) return res.status(404).json({ message: "Ürün bulunamadı" });

  res.json(product);
});

// 📌 **Ürünü güncelle (Admin)**
export const updateProduct = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Geçersiz ürün ID!" });
  }

  const { title, description, price, stock, category } = req.body;
  const images = req.files ? req.files.map((file) => file.path) : undefined;

  // ✅ **Kategori geçerli mi kontrol et**
  if (category && !mongoose.Types.ObjectId.isValid(category)) {
    return res.status(400).json({ message: "Geçersiz kategori ID!" });
  }

  // ✅ **Güncellenecek alanları belirle**
  const updatedFields = { title, description, price, stock };
  if (images) updatedFields.images = images;
  if (category) updatedFields.category = category; // Kategori güncellenebilir

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedFields, {
    new: true,
    runValidators: true,
  }).populate("category", "name image");

  if (!updatedProduct) return res.status(404).json({ message: "Ürün bulunamadı" });

  res.json(updatedProduct);
});

// 📌 **Ürünü sil (Admin)**
export const deleteProduct = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Geçersiz ürün ID!" });
  }

  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Ürün bulunamadı!" });

  res.json({ message: "Ürün başarıyla silindi" });
});
