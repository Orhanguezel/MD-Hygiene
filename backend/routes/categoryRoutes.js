import express from "express";
import { 
  fetchCategories, 
  createCategory, 
  getCategoryById, 
  updateCategory, 
  deleteCategory 
} from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js"; // ✅ Multer middleware

const router = express.Router();

// ✅ **Tüm kategorileri getir ve yeni kategori ekle**
router.post(
  "/",
  (req, res, next) => {
    req.uploadType = "category"; // 📌 Kategori resimleri doğru klasöre kaydedilecek
    next();
  },
  protect,
  admin,
  upload.single("image"),
  createCategory
);

router.get("/", fetchCategories);

// ✅ **Belirli bir kategoriyi getir, güncelle veya sil**
router.get("/:id", getCategoryById);

router.put(
  "/:id",
  (req, res, next) => {
    req.uploadType = "category";
    next();
  },
  protect,
  admin,
  upload.single("image"),
  updateCategory
);

router.delete("/:id", protect, admin, deleteCategory);

export default router;
