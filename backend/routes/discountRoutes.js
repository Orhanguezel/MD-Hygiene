import express from "express";
import { getDiscounts, createDiscount, applyDiscount, deleteDiscount } from "../controllers/discountController.js";

const router = express.Router();

router.route("/").get(getDiscounts).post(createDiscount);
router.route("/:id").delete(deleteDiscount);
router.route("/apply").post(applyDiscount);

export default router;
