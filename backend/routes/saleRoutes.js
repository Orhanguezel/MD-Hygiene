import express from "express";
import { getSales, getSaleById, getMonthlySales } from "../controllers/saleController.js";

const router = express.Router();

router.route("/").get(getSales);
router.route("/:id").get(getSaleById);
router.route("/monthly-report").get(getMonthlySales);


export default router;

