import express from "express";
import { getDiscounts, createDiscount, applyDiscount, deleteDiscount } from "../controllers/discountController.js";

const router = express.Router();

router.get("/", getDiscounts);
router.post("/", createDiscount);
router.post("/apply", applyDiscount); // İndirim kodunu uygula
router.delete("/:id", deleteDiscount); // İndirim kodunu sil

export default router;
