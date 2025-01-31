import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";
import { createOrder, getAllOrders, getOrderById } from "../controllers/orderController.js";

const router = express.Router();

// Kullanıcı
router.post("/register", registerUser);
router.post("/login", loginUser);

// Ürünler
router.get("/products", getAllProducts);
router.post("/products", createProduct);
router.get("/products/:id", getProductById);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

// Siparişler
router.post("/orders", createOrder);
router.get("/orders", getAllOrders);
router.get("/orders/:id", getOrderById);

export default router;
