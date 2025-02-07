import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./dbConnect.js";
import Category from "../models/Category.js";

dotenv.config();
await connectDB();

const seedCategories = async () => {
  try {
    console.log("🔄 Kategori verileri temizleniyor...");
    await Category.deleteMany();
    console.log("✅ Kategori verileri temizlendi.");

    console.log("📌 Yeni kategoriler ekleniyor...");

    const categories = [
      { name: "Dezenfektanlar", description: "El ve yüzey dezenfektanları" },
      { name: "Temizlik Ürünleri", description: "Genel temizlik malzemeleri" },
      { name: "Kişisel Bakım", description: "Şampuan, sabun ve hijyen ürünleri" }
    ];

    await Category.insertMany(categories);
    console.log("✅ Kategoriler başarıyla eklendi!");
    process.exit();
  } catch (error) {
    console.error("❌ Kategori ekleme hatası:", error);
    process.exit(1);
  }
};

seedCategories();
