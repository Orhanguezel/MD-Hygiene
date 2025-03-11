import Product from "../models/Product.js";
import Category from "../models/Category.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose"; // ✅ ObjectId dönüşümü için

// 📌 **Tüm ürünleri getir**
export const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name image");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "⚠️ Ürünler getirilemedi!", error: error.message });
  }
});

// 📌 **Ürün Ekleme**
export const createProduct = asyncHandler(async (req, res) => {
  console.log("📌 Backend'e Gelen Veri:", req.body);

  const { title, description, price, stock, category } = req.body;
  
  if (!title || !price || !stock || !category) {
    return res.status(400).json({ message: "⚠️ Lütfen tüm zorunlu alanları doldurun!" });
  }

  if (!mongoose.Types.ObjectId.isValid(category)) {
    return res.status(400).json({ message: "⚠️ Geçersiz kategori ID!" });
  }

  const existingCategory = await Category.findById(category);
  if (!existingCategory) {
    return res.status(404).json({ message: "⚠️ Kategori bulunamadı!" });
  }

  // 📌 **Yüklenen Resimleri Al ve Tam URL Yap**
  let images = req.files.length > 0 ? req.files.map(file => `/uploads/${file.filename}`) : [];

  const newProduct = new Product({
    title,
    description,
    price,
    stock,
    category,
    images
  });

  await newProduct.save();
  res.status(201).json({ message: "✅ Ürün başarıyla oluşturuldu!", product: newProduct });
});

// 📌 **Belirli bir ürünü getir (Kategori bilgileriyle birlikte)**
export const getProductById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "⚠️ Geçersiz ürün ID!" });
  }

  const product = await Product.findById(req.params.id)
    .populate("category", "name image")
    .select("-__v");

  if (!product) return res.status(404).json({ message: "⚠️ Ürün bulunamadı!" });

  res.json(product);
});

// 📌 **Ürünü Güncelle**
export const updateProduct = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "⚠️ Geçersiz ürün ID!" });
  }

  const { title, description, price, stock, category } = req.body;

  // 📌 **Mevcut ürünü getir**
  const existingProduct = await Product.findById(req.params.id);
  if (!existingProduct) return res.status(404).json({ message: "⚠️ Ürün bulunamadı!" });

  // 📌 **Yüklenen Resimleri Al ve Güncelle**
  let images = req.files.length > 0 ? req.files.map((file) => `/uploads/${file.filename}`) : existingProduct.images;

  existingProduct.title = title || existingProduct.title;
  existingProduct.description = description || existingProduct.description;
  existingProduct.price = price || existingProduct.price;
  existingProduct.stock = stock || existingProduct.stock;
  existingProduct.category = category || existingProduct.category;
  existingProduct.images = images;

  const updatedProduct = await existingProduct.save();

  res.json({ message: "✅ Ürün başarıyla güncellendi!", product: updatedProduct });
});

// 📌 **Ürünü Sil (Admin)**
export const deleteProduct = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "⚠️ Geçersiz ürün ID!" });
  }

  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "⚠️ Ürün bulunamadı!" });

  res.json({ message: "✅ Ürün başarıyla silindi!" });
});
// 📌 **Ürünleri Kategoriye Göre Filtrele**
export const fetchProductsByCategory = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "⚠️ Geçersiz kategori ID!" });
  }

  const products = await Product.find({ category: req.params.id }).populate("category", "name image");
  res.json(products);
});