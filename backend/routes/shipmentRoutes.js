import express from "express";
import { getShipments, addShipment, getShipmentById, updateShipment, deleteShipment } from "../controllers/shipmentController.js";

const router = express.Router();

router.get("/", getShipments);
router.post("/", addShipment);
router.get("/:id", getShipmentById); // Belirli bir kargoyu getir
router.put("/:id", updateShipment); // Kargoyu güncelle
router.delete("/:id", deleteShipment); // Kargoyu sil

export default router;


