import express from "express";
import { getShipments, addShipment, getShipmentById, updateShipment, deleteShipment } from "../controllers/shipmentController.js";

const router = express.Router();

router.route("/").get(getShipments).post(addShipment);
router.route("/:id").get(getShipmentById).put(updateShipment).delete(deleteShipment);

export default router;


