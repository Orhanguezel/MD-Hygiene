import express from "express";
import { 
  getUserCart, 
  addToCart, 
  increaseQuantity, 
  decreaseQuantity, 
  removeFromCart, 
  clearCart 
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📌 Kullanıcının sepetini getir
router.get("/user", protect, getUserCart);

// ➕ Sepete ürün ekle
router.post("/", protect, addToCart);

// 🔺 Miktar artır
router.patch("/increase/:productId", protect, increaseQuantity);

// 🔻 Miktar azalt
router.patch("/decrease/:productId", protect, decreaseQuantity);

// ❌ Sepetten ürün kaldır
router.delete("/remove/:productId", protect, removeFromCart);

// 🗑️ Sepeti temizle
router.delete("/clear", protect, clearCart);

export default router;

