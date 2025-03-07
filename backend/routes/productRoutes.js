import express from "express";
import { 
  fetchProducts, 
  createProduct, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ **Tüm ürünleri getir ve yeni ürün ekle**
router.route("/").get(fetchProducts).post(protect, admin, createProduct);

// ✅ **Belirli bir ürünü getir, güncelle veya sil**
router.route("/:id").get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);

export default router;
