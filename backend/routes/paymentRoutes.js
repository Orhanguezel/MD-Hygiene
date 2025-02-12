import express from "express";
import { createPayment, getPayments, getPaymentById } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPayment); // Ödeme oluştur
router.get("/", protect, getPayments); // Tüm ödemeleri getir
router.get("/:id", protect, getPaymentById); // Belirli bir ödeme detayını getir

export default router;


