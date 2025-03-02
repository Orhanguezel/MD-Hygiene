import express from "express";
import { 
  createOrder, 
  getUserOrders, 
  getAllOrders, 
  getOrderById, 
  updateOrderStatus, 
  cancelOrder,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Kullanıcı sipariş oluşturabilir ve kendi siparişlerini görebilir
router.route("/").post(protect, createOrder).get(protect, getUserOrders);

// ✅ Admin tüm siparişleri görebilir
router.route("/admin").get(protect, admin, getAllOrders);

// ✅ Belirli siparişe erişim (Admin ve Kullanıcı)
router.route("/:id").get(protect, getOrderById);

// ✅ Sipariş güncelleme (Admin)
router.route("/:id/status").put(protect, admin, updateOrderStatus);

// ✅ Sipariş iptal etme (Kullanıcı)
router.route("/:id/cancel").put(protect, cancelOrder);

export default router;

