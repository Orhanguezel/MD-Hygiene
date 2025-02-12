import mongoose from "mongoose";
import connectDB from "./dbConnect.js";
import Payment from "../models/Payment.js";
import Order from "../models/Order.js";

const seedPayments = async () => {
  await connectDB();
  await Payment.deleteMany();

  const order = await Order.findOne();
  if (!order) {
    console.error("❌ Sipariş bulunamadı!");
    mongoose.connection.close();
    return;
  }

  const payment = {
    order: order._id,
    user: order.user,
    amount: order.totalAmount,
    paymentMethod: "credit_card",
    transactionId: `TXN-${Date.now()}`,
    status: "completed",
  };

  await Payment.create(payment);
  console.log("✅ Ödeme verileri başarıyla eklendi.");
  mongoose.connection.close();
};

seedPayments();

