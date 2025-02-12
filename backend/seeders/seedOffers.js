import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./dbConnect.js";
import Offer from "../models/Offer.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

dotenv.config();
await connectDB();

const seedOffers = async () => {
  try {
    console.log("🔄 Teklif verileri temizleniyor...");
    await Offer.deleteMany();
    console.log("✅ Teklif verileri temizlendi.");

    console.log("📌 Kullanıcılar ve ürünler yükleniyor...");
    const users = await User.find();
    const products = await Product.find();

    if (users.length === 0 || products.length === 0) {
      throw new Error("⚠️ Önce kullanıcı ve ürünleri eklemelisiniz!");
    }

    const offers = [
      {
        user: users[1]._id,
        items: [{ product: products[0]._id, quantity: 20, unitPrice: products[0].price }],
        totalAmount: products[0].price * 20,
        taxAmount: (products[0].price * 20) * 0.19,
        status: "submitted"
      },
      {
        user: users[2]._id,
        items: [{ product: products[1]._id, quantity: 50, unitPrice: products[1].price }],
        totalAmount: products[1].price * 50,
        taxAmount: (products[1].price * 50) * 0.19,
        status: "draft"
      }
    ];

    await Offer.insertMany(offers);
    console.log("✅ Teklifler başarıyla eklendi!");
    process.exit();
  } catch (error) {
    console.error("❌ Teklif ekleme hatası:", error);
    process.exit(1);
  }
};

seedOffers();
