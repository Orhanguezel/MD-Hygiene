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

router
  .route("/")
  .get(protect, admin, getOffers)   // 🔒 Admin yetkisiyle tüm teklifleri getir
  .post(protect, createOffer);      // 📝 Kullanıcı teklif oluşturabilir

router
  .route("/:id")
  .get(protect, getOfferById)       // 📌 Tek bir teklifi getir
  .put(protect, updateOffer)        // ✏️ Teklifi güncelle
  .delete(protect, admin, deleteOffer); // ❌ Admin yetkisiyle teklif sil

router
  .route("/:id/status")
  .patch(protect, updateOfferStatus);  // 🔄 Teklif durumunu güncelle

export default router;
