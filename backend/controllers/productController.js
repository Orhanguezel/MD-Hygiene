import Product from "../models/Product.js";
import Category from "../models/Category.js"; // Kategori doğrulaması için

// ✅ Tüm ürünleri getir (Kategori ve tüm detaylarla birlikte)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category") // Kategorinin tüm bilgileri getiriliyor
      .select("-__v"); // Gereksiz MongoDB versiyon alanını kaldır

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Yeni ürün oluştur (Eksiksiz ve tam kapsamlı)
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, brand, unit, weight, volume, gtin_ean, reach_compliance } = req.body;
    const images = req.files ? req.files.map(file => file.path) : []; // Çoklu resim yükleme desteği

    // 🔍 Kategori ID doğrulama
    const existingCategory = await Category.findById(category);
    if (!existingCategory) return res.status(400).json({ message: "Geçersiz kategori ID!" });

    // ✅ Yeni ürün oluştur
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Belirli bir ürünü getir (Kategori ve tüm detaylarla birlikte)
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category") // Kategorinin tüm bilgileri getiriliyor
      .select("-__v"); // Gereksiz alanları kaldır

    if (!product) return res.status(404).json({ message: "Ürün bulunamadı" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Ürünü güncelle (Eksiksiz ve tam kapsamlı)
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, brand, unit, weight, volume, gtin_ean, reach_compliance } = req.body;
    const images = req.files ? req.files.map(file => file.path) : undefined; // Yeni resimler varsa güncelle

    // Güncellenecek alanları belirle
    const updatedFields = {
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
    };

    if (images) updatedFields.images = images; // Resimler güncellenecekse ekle

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedFields, { new: true }).populate("category");

    if (!updatedProduct) return res.status(404).json({ message: "Ürün bulunamadı" });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Ürün güncellenemedi", error: error.message });
  }
};

// ✅ Ürünü sil (Tüm detaylarıyla birlikte kaldır)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Ürün bulunamadı" });

    res.status(200).json({ message: "Ürün başarıyla silindi" });
  } catch (error) {
    res.status(500).json({ message: "Ürün silinemedi", error: error.message });
  }
};
