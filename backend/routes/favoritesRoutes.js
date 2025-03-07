import express from "express";
import { 
  getFavorites, 
  addFavorite, 
  removeFavorite 
} from "../controllers/favoritesController.js";
import { protect } from "../middleware/authMiddleware.js"; // ✅ Aynı yapı için `protect` middleware kullanıldı

const router = express.Router();

// 📌 Kullanıcının favorilerini getir
router.get("/user", protect, getFavorites);

// ➕ Favorilere ürün ekle
router.post("/", protect, addFavorite);

// ❌ Favoriden ürün kaldır
router.delete("/remove/:productId", protect, removeFavorite);

export default router;
