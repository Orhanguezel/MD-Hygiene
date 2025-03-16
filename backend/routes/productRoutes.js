import express from "express";
import { 
  fetchProducts, 
  createProduct, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js"; // ✅ Resim yükleme middleware

const router = express.Router();

// ✅ **Tüm ürünleri getir ve yeni ürün ekle**
router.post(
  "/",
  (req, res, next) => {
    req.uploadType = "product"; // 📌 Ürün resimleri doğru klasöre kaydedilecek
    next();
  },
  protect,
  admin,
  upload.array("images", 5), // ✅ Maksimum 5 resim yükleme desteği
  createProduct
);

router.get("/", fetchProducts);

// ✅ **Belirli bir ürünü getir, güncelle veya sil**
router.get("/:id", getProductById);

router.put(
  "/:id",
  (req, res, next) => {
    req.uploadType = "product";
    next();
  },
  protect,
  admin,
  upload.array("images", 5), // ✅ Ürün güncelleme sırasında resim ekleyebilme
  updateProduct
);

router.delete("/:id", protect, admin, deleteProduct);

export default router;
