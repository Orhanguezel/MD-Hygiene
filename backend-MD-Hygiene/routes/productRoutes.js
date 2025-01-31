import express from "express";
import { getAllProducts, createProduct, getProductById } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts); // Tüm ürünleri getir
router.post("/", createProduct); // Yeni ürün oluştur
router.get("/:id", getProductById); // Belirli bir ürünü getir

export default router;
