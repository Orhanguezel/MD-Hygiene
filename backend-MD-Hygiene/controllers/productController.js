import Product from "../models/Product.js";

// Tüm ürünleri getir
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Yeni ürün oluştur
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, brand, unit, weight, volume } = req.body;

    const newProduct = new Product({ name, description, price, stock, category, brand, unit, weight, volume });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Belirli bir ürünü getir
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Ürün bulunamadı" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
