import Product from "../models/Product.js";
import Category from "../models/Category.js";
import asyncHandler from "express-async-handler";

// 📌 **Tüm ürünleri getir (Kategori bilgileriyle birlikte)**
export const fetchProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate("category").select("-__v");
  res.json(products);
});

// 📌 **Tüm kategorileri getir**
export const fetchCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().select("-__v");
  res.json(categories);
});

// 📌 **Yeni ürün oluştur (Admin)**
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, category, brand, unit, weight, volume, gtin_ean, reach_compliance } = req.body;
  const images = req.files ? req.files.map(file => file.path) : []; 

  const existingCategory = await Category.findById(category);
  if (!existingCategory) return res.status(400).json({ message: "Geçersiz kategori ID!" });

  const newProduct = new Product({
    name,
    description,
    price,
    stock,
    category,
    brand,
    unit,
    weight,
    volume,
    gtin_ean,
    reach_compliance,
    images,
  });

  await newProduct.save();
  res.status(201).json(newProduct);
});

// 📌 **Belirli bir ürünü getir (Kategori bilgileriyle birlikte)**
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category").select("-__v");

  if (!product) return res.status(404).json({ message: "Ürün bulunamadı" });

  res.json(product);
});

// 📌 **Ürünü güncelle (Admin)**
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, category, brand, unit, weight, volume, gtin_ean, reach_compliance } = req.body;
  const images = req.files ? req.files.map(file => file.path) : undefined;

  const updatedFields = { name, description, price, stock, category, brand, unit, weight, volume, gtin_ean, reach_compliance };
  if (images) updatedFields.images = images;

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedFields, { new: true }).populate("category");

  if (!updatedProduct) return res.status(404).json({ message: "Ürün bulunamadı" });

  res.json(updatedProduct);
});

// 📌 **Ürünü sil (Admin)**
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Ürün bulunamadı" });

  res.json({ message: "Ürün başarıyla silindi" });
});
