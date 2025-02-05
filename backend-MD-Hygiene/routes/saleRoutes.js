import express from "express";
import { getSalesByUser, addSale, getAllSales } from "../controllers/saleController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Kullanıcıya ait satışları getir
router.get("/get/:userId", protect, getSalesByUser);

// ✅ Yeni satış ekleme
router.post("/add", protect, addSale);

// ✅ Tüm satışları getir (Admin)
router.get("/all", protect, admin, getAllSales);

export default router;
