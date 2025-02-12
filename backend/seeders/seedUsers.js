import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./dbConnect.js";
import User from "../models/User.js";

dotenv.config();
await connectDB();

const seedUsers = async () => {
  try {
    console.log("🔄 Kullanıcı verileri temizleniyor...");
    await User.deleteMany();
    console.log("✅ Kullanıcı verileri temizlendi.");

    console.log("📌 Yeni kullanıcılar ekleniyor...");

    const users = [
      { name: "Orhan Admin", email: "admin@mdhygiene.com", password: "Admin123!", role: "admin", phone: "1234567890", addresses: ["Berlin, Germany"], profileImage: "admin.jpg" },
      { name: "Ali Müşteri", email: "ali@mdhygiene.com", password: "Customer123!", role: "customer", phone: "9876543210", addresses: ["Hamburg, Germany"], profileImage: "ali.jpg" },
      { name: "Ayşe Müşteri", email: "ayse@mdhygiene.com", password: "Customer123!", role: "customer", phone: "1231231234", addresses: ["Münih, Germany"], profileImage: "ayse.jpg" }
    ];

    await User.insertMany(users);
    console.log("✅ Kullanıcılar başarıyla eklendi!");
    process.exit();
  } catch (error) {
    console.error("❌ Kullanıcı ekleme hatası:", error);
    process.exit(1);
  }
};

seedUsers();
