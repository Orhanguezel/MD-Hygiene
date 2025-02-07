import express from "express";
import { getNotifications, markAsRead, deleteNotification } from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getNotifications); // Bildirimleri getir
router.put("/:id", protect, markAsRead); // Bildirimi okundu olarak işaretle
router.delete("/:id", protect, deleteNotification); // Bildirimi sil

export default router;
