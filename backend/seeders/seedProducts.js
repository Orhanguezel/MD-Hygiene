import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./dbConnect.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

dotenv.config();
await connectDB();

const seedProducts = async () => {
  try {
    console.log("🔄 Ürün verileri temizleniyor...");
    await Product.deleteMany();
    console.log("✅ Ürün verileri temizlendi.");

    console.log("📌 Yeni ürünler ekleniyor...");
    const categories = await Category.find();
    if (!categories || categories.length === 0) {
      throw new Error("❌ Kategoriler bulunamadı! Önce kategorileri ekleyin.");
    }

    const products = [
      { name: "El Dezenfektanı 500ml", description: "Alkol bazlı el dezenfektanı", price: 9.99, stock: 100, category: categories[0]._id, brand: "Dettol", unit: "Liter", weight: "0.5kg", gtin_ean: "1234567890123", reach_compliance: true, images: ["dezenfektan1.jpg"] },
      { name: "Sıvı Sabun 500ml", description: "Antibakteriyel sıvı sabun", price: 5.99, stock: 200, category: categories[1]._id, brand: "Palmolive", unit: "Liter", weight: "0.5kg", gtin_ean: "1234567890124", reach_compliance: true, images: ["sabun1.jpg"] },
      { name: "Bulaşık Deterjanı 1L", description: "Güçlü yağ sökücü bulaşık deterjanı", price: 7.49, stock: 150, category: categories[1]._id, brand: "Fairy", unit: "Liter", weight: "1kg", gtin_ean: "1234567890125", reach_compliance: true, images: ["bulasik1.jpg"] },
      { name: "Şampuan 750ml", description: "Saç dökülmesini önleyen şampuan", price: 12.99, stock: 50, category: categories[2]._id, brand: "Head & Shoulders", unit: "Liter", weight: "0.75kg", gtin_ean: "1234567890126", reach_compliance: true, images: ["sampuan1.jpg"] }
    ];

    await Product.insertMany(products);
    console.log("✅ Ürünler başarıyla eklendi!");
    process.exit();
  } catch (error) {
    console.error("❌ Ürün ekleme hatası:", error);
    process.exit(1);
  }
};

seedProducts();
