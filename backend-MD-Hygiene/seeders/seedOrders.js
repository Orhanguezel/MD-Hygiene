import mongoose from "mongoose";
import connectDB from "./dbConnect.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

const seedOrders = async () => {
  await connectDB();
  await Order.deleteMany();

  const user = await User.findOne({ email: "orhan@md-hygiene.de" });
  const product = await Product.findOne({ name: "Toilettenpapier" });

  if (!user || !product) {
    console.error("❌ Kullanıcı veya ürün bulunamadı!");
    mongoose.connection.close();
    return;
  }

  const orders = [
    {
      user: user._id,
      products: [{ product: product._id, quantity: 5, unitPrice: product.price }],
      totalAmount: product.price * 5,
      shippingAddress: user.address,
    },
  ];

  await Order.insertMany(orders);
  console.log("✅ Sipariş verileri başarıyla eklendi.");
  mongoose.connection.close();
};

seedOrders();
