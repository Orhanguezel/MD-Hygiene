import express from "express";
import { getReviewsByProduct, addReview, updateReview, deleteReview } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js"; // Giriş gerektiriyorsa

const router = express.Router();

router.get("/:productId", getReviewsByProduct); // ✅ Belirli ürünün yorumlarını getir
router.post("/", protect, addReview); // ✅ Yorum ekle (Giriş gerektiriyor)
router.put("/:id", protect, updateReview); // ✅ Yorumu güncelle (Giriş gerektiriyor)
router.delete("/:id", protect, deleteReview); // ✅ Yorumu sil (Giriş gerektiriyor)
router.get("/", async (req, res) => {
    try {
      const reviews = await Review.find()
        .populate("user", "name email")
        .populate("product", "name");
  
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Tüm yorumlar getirilirken hata oluştu!", details: error.message });
    }
  });
  

export default router;
