import express from "express";
import { getStores, addStore, getStoreById, updateStore, deleteStore } from "../controllers/storeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getStores);
router.post("/add", protect, addStore);
router.get("/:id", getStoreById); // Belirli bir mağazayı getir
router.put("/:id", protect, updateStore); // Mağazayı güncelle
router.delete("/:id", protect, deleteStore); // Mağazayı sil

export default router;
