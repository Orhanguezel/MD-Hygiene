import express from "express";
import { getSales, getSaleById, getMonthlySales } from "../controllers/saleController.js";

const router = express.Router();

router.get("/", getSales);
router.get("/:id", getSaleById);
router.get("/monthly-report", getMonthlySales);

export default router;

