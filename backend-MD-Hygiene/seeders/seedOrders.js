import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./dbConnect.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

dotenv.config();
await connectDB();

const seedOrders = async () => {
  try {
    console.log("🔄 Sipariş verileri temizleniyor...");
    await Order.deleteMany();
    console.log("✅ Sipariş verileri temizlendi.");

    console.log("📌 Kullanıcılar ve ürünler yükleniyor...");
    const users = await User.find();
    const products = await Product.find();

    if (users.length === 0 || products.length === 0) {
      throw new Error("⚠️ Önce kullanıcı ve ürünleri eklemelisiniz!");
    }

    const orders = [
      {
        user: users[0]._id,
        products: [{ product: products[0]._id, quantity: 2, unitPrice: products[0].price }],
        totalAmount: products[0].price * 2,
        taxAmount: (products[0].price * 2) * 0.19,
        status: "delivered",
        shippingAddress: {
          street: "Hauptstr. 23",
          city: "Berlin",
          postalCode: "10115",
          country: "Germany"
        },
        paymentStatus: "paid",
        trackingNumber: "DHL-123456789"
      },
      {
        user: users[1]._id,
        products: [{ product: products[1]._id, quantity: 3, unitPrice: products[1].price }],
        totalAmount: products[1].price * 3,
        taxAmount: (products[1].price * 3) * 0.19,
        status: "pending",
        shippingAddress: {
          street: "Musterstr. 45",
          city: "Hamburg",
          postalCode: "20095",
          country: "Germany"
        },
        paymentStatus: "pending",
        trackingNumber: null
      }
    ];

    await Order.insertMany(orders);
    console.log("✅ Siparişler başarıyla eklendi!");
    process.exit();
  } catch (error) {
    console.error("❌ Sipariş ekleme hatası:", error);
    process.exit(1);
  }
};

seedOrders();
