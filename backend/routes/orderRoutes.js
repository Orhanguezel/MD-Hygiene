import express from "express";
import { 
  createOrder, 
  getUserOrders, 
  getAllOrders, 
  getOrderById, 
  updateOrderStatusOrCancel,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Kullanıcı sipariş oluşturabilir ve kendi siparişlerini görebilir
router.route("/")
  .post(protect, createOrder)  // Yeni sipariş oluştur
  .get(protect, getUserOrders);  // Kullanıcının siparişlerini getir

// ✅ Admin tüm siparişleri görebilir
router.route("/admin")
  .get(protect, admin, getAllOrders);

// ✅ Belirli siparişe erişim
router.route("/:id")
  .get(protect, getOrderById); // Sipariş detaylarını getir

// ✅ Sipariş durumu güncelleme veya iptal (YENİ)
router.route("/:id/status")
  .put(protect, updateOrderStatusOrCancel);

export default router;

