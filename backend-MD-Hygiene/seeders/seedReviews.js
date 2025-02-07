import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./dbConnect.js";
import Review from "../models/Review.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

dotenv.config();
await connectDB();

const seedReviews = async () => {
  try {
    console.log("🔄 Yorum verileri temizleniyor...");
    await Review.deleteMany();
    console.log("✅ Yorum verileri temizlendi.");

    const users = await User.find();
    const products = await Product.find();
    if (users.length === 0 || products.length === 0) throw new Error("⚠️ Önce kullanıcı ve ürünleri ekleyin!");

    console.log("📌 Yeni yorumlar ekleniyor...");

    const reviews = [
      {
        user: users[0]._id,
        product: products[0]._id,
        rating: 5,
        comment: "Mükemmel kalite!",
      },
      {
        user: users[1]._id,
        product: products[1]._id,
        rating: 4,
        comment: "Çok iyi, tavsiye ederim.",
      },
    ];

    await Review.insertMany(reviews);
    console.log("✅ Yorumlar başarıyla eklendi!");
    process.exit();
  } catch (error) {
    console.error("❌ Yorum ekleme hatası:", error);
    process.exit(1);
  }
};

seedReviews();

