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
router.route("/")
  .get(fetchProducts)
  .post(protect, admin, upload.array("images", 5), createProduct); // ✅ Maksimum 5 resim yükleme desteği

// ✅ **Belirli bir ürünü getir, güncelle veya sil**
router.route("/:id")
  .get(getProductById)
  .put(protect, admin, upload.array("images", 5), updateProduct) // ✅ Ürün güncelleme sırasında resim ekleyebilme
  .delete(protect, admin, deleteProduct);

export default router;
