import express from "express";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import Invoice from "../models/Invoice.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const router = express.Router();

// 📊 Admin Dashboard İstatistikleri
router.get("/stats", async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Payment.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const pendingInvoices = await Invoice.countDocuments({ status: "pending" });
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    res.json({
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      pendingInvoices,
      totalUsers,
      totalProducts,
    });
  } catch (error) {
    res.status(500).json({ message: "Hata oluştu", error });
  }
});

export default router;
