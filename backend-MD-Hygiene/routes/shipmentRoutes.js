import express from "express";
import { getShipments, addShipment } from "../controllers/shipmentController.js"; // ✅ Doğru çağrı

const router = express.Router();

router.get("/", getShipments);
router.post("/", addShipment);

export default router;

