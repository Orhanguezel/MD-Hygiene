import express from "express";
import { getReviewsByProduct, addReview } from "../controllers/reviewController.js";
import mongoose from "mongoose";

const router = express.Router();

// ✅ Ürün ID'si olup olmadığını kontrol et ve `ObjectId` formatına uygula
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Geçersiz ürün ID'si!" });
    }

    const reviews = await getReviewsByProduct(productId);
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ error: "Bu ürün için yorum bulunamadı!" });
    }

    res.json(reviews);
  } catch (error) {
    console.error("🔴 Yorumları alırken hata:", error);
    res.status(500).json({ error: "Yorumları çekerken hata oluştu!" });
  }
});

// ✅ Yorum ekleme, `productId` kontrolü ve hata yönetimi
router.post("/", async (req, res) => {
  try {
    const { productId, user, rating, comment } = req.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Geçersiz ürün ID'si!" });
    }

    const newReview = await addReview({ productId, user, rating, comment });

    res.status(201).json(newReview);
  } catch (error) {
    console.error("🔴 Yorum ekleme hatası:", error);
    res.status(500).json({ error: "Yorum eklenirken hata oluştu!" });
  }
});

export default router;
