import mongoose from "mongoose";
import connectDB from "./dbConnect.js";
import Invoice from "../models/Invoice.js";
import Order from "../models/Order.js";

const seedInvoices = async () => {
  await connectDB();
  await Invoice.deleteMany();

  const order = await Order.findOne();
  if (!order) {
    console.error("❌ Sipariş bulunamadı!");
    mongoose.connection.close();
    return;
  }

  const invoice = {
    order: order._id,
    user: order.user,
    totalAmount: order.totalAmount,
    taxAmount: (order.totalAmount * 19) / 100,
    invoiceNumber: `INV-${Date.now()}`,
    status: "pending",
  };

  await Invoice.create(invoice);
  console.log("✅ Fatura verileri başarıyla eklendi.");
  mongoose.connection.close();
};

seedInvoices();

