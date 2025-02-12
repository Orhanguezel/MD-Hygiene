import express from "express";
import { 
  createOffer, 
  getOffers, 
  getOfferById, 
  updateOffer, 
  updateOfferStatus, 
  deleteOffer 
} from "../controllers/offerController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Teklif oluştur
router.post("/", protect, createOffer);

// ✅ Tüm teklifleri getir (Admin yetkisi gerekir)
router.get("/", protect, admin, getOffers);

// ✅ Tek bir teklifi getir
router.get("/:id", protect, getOfferById);

// ✅ Teklifi güncelle
router.put("/:id", protect, updateOffer);

// ✅ Teklif durumunu güncelle (Onayla/Reddet)
router.patch("/:id/status", protect, updateOfferStatus);

// ✅ Teklifi sil (Sadece admin)
router.delete("/:id", protect, admin, deleteOffer);

export default router;
