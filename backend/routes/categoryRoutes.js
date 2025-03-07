import express from "express";
import { 
  fetchCategories, 
  createCategory, 
  getCategoryById, 
  updateCategory, 
  deleteCategory 
} from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ **Tüm kategorileri getir ve yeni kategori ekle**
router.route("/").get(fetchCategories).post(protect, admin, createCategory);

// ✅ **Belirli bir kategoriyi getir, güncelle veya sil**
router.route("/:id").get(getCategoryById).put(protect, admin, updateCategory).delete(protect, admin, deleteCategory);

export default router;




