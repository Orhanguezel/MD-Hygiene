import express from "express";
import { createOrder, getAllOrders, getOrderById } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder); // Sipariş oluştur
router.get("/", protect, getAllOrders); // Tüm siparişleri getir
router.get("/:id", protect, getOrderById); // Belirli bir siparişi getir

export default router;
