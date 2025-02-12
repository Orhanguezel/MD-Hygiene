import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./dbConnect.js";
import Invoice from "../models/Invoice.js";
import Order from "../models/Order.js";

dotenv.config();
await connectDB();

const seedInvoices = async () => {
  try {
    console.log("🔄 Fatura verileri temizleniyor...");
    await Invoice.deleteMany();
    console.log("✅ Fatura verileri temizlendi.");

    console.log("📌 Siparişler yükleniyor...");
    const orders = await Order.find();

    if (orders.length === 0) {
      throw new Error("⚠️ Önce siparişleri eklemelisiniz!");
    }

    const invoices = orders.map(order => ({
      order: order._id,
      user: order.user,
      items: order.products.map(product => ({
        product: product.product,
        quantity: product.quantity,
        unitPrice: product.unitPrice
      })),
      totalAmount: order.totalAmount,
      taxAmount: order.taxAmount,
      taxRate: 19,
      invoiceNumber: `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: order.paymentStatus === "paid" ? "paid" : "pending",
    }));

    await Invoice.insertMany(invoices);
    console.log("✅ Faturalar başarıyla eklendi!");
    process.exit();
  } catch (error) {
    console.error("❌ Fatura ekleme hatası:", error);
    process.exit(1);
  }
};

seedInvoices();
