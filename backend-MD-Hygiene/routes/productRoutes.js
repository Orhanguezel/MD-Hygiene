import express from "express";
import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProduct); // Ürün güncelleme
router.delete("/:id", deleteProduct); // Ürün silme

export default router;

