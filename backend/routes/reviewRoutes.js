import express from "express";
import { 
  fetchReviews, 
  fetchProductReviews, 
  addReview, 
  updateReview, 
  deleteReview, 
  getReviewsByUser, 
  deleteAllReviewsByProduct 
} from "../controllers/reviewController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ **Tüm yorumları getir (Sadece Admin)**
router.route("/").get(protect, admin, fetchReviews).post(protect, addReview);

// ✅ **Belirli bir ürünün yorumlarını getir**
router.route("/product/:productId").get(fetchProductReviews);

// ✅ **Belirli bir kullanıcının yorumlarını getir (Sadece Admin)**
router.route("/user/:userId").get(protect, admin, getReviewsByUser);

// ✅ **Belirli bir ürünün tüm yorumlarını sil (Sadece Admin)**
router.route("/product/:productId").delete(protect, admin, deleteAllReviewsByProduct);

// ✅ **Tek bir yorumu getir, güncelle veya sil**
router.route("/:id").put(protect, updateReview).delete(protect, deleteReview);

export default router;
