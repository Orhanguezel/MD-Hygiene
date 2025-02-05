import express from "express";
import { getStores, addStore } from "../controllers/storeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Tüm mağazaları getir
router.get("/", getStores);

// ✅ Yeni mağaza ekle (Sadece giriş yapmış kullanıcılar ekleyebilir)
router.post("/add", protect, addStore);

export default router;
