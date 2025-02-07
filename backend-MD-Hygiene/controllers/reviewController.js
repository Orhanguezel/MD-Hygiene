import Review from "../models/Review.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

// ✅ **Tüm yorumları getir (Admin)**
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "name email").populate("product", "name");

    res.status(200).json(reviews);
  } catch (error) {
    console.error("❌ Tüm yorumları alırken hata:", error);
    res.status(500).json({ error: "Tüm yorumlar getirilirken hata oluştu!", details: error.message });
  }
};

// ✅ **Belirli bir ürünün yorumlarını getir**
export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Geçersiz ürün ID!" });
    }

    const reviews = await Review.find({ product: productId }).populate("user", "name email");

    res.status(200).json(reviews);
  } catch (error) {
    console.error("❌ Ürün yorumlarını alırken hata:", error);
    res.status(500).json({ error: "Yorumlar alınırken hata oluştu!", details: error.message });
  }
};

// ✅ **Yeni yorum ekleme**
export const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user.id;

    if (!productId || !rating || !comment) {
      return res.status(400).json({ error: "Tüm alanlar zorunludur!" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Geçersiz ürün ID!" });
    }

    // ✅ Kullanıcı daha önce yorum yaptı mı?
    const existingReview = await Review.findOne({ product: productId, user: userId });
    if (existingReview) {
      return res.status(400).json({ error: "Bu ürüne zaten yorum yaptınız!" });
    }

    // ✅ Yeni yorum oluştur
    const newReview = new Review({ user: userId, product: productId, rating, comment });
    await newReview.save();

    // ✅ Ürünün ortalama puanını güncelle
    const avgRating = await Review.calculateAverageRating(productId);
    await Product.findByIdAndUpdate(productId, { averageRating: avgRating });

    res.status(201).json({ message: "Yorum başarıyla eklendi!", review: newReview });
  } catch (error) {
    console.error("❌ Yorum eklenirken hata:", error);
    res.status(500).json({ error: "Yorum eklenirken hata oluştu!", details: error.message });
  }
};

// ✅ **Yorumu güncelle**
export const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const userId = req.user.id;
    const reviewId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({ error: "Geçersiz yorum ID!" });
    }

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ error: "Yorum bulunamadı!" });

    if (review.user.toString() !== userId) {
      return res.status(403).json({ error: "Bu yorumu güncelleme yetkiniz yok!" });
    }

    review.rating = rating;
    review.comment = comment;
    review.editedAt = new Date();
    await review.save();

    // ✅ Ürünün ortalama puanını güncelle
    const avgRating = await Review.calculateAverageRating(review.product);
    await Product.findByIdAndUpdate(review.product, { averageRating: avgRating });

    res.status(200).json({ message: "Yorum başarıyla güncellendi!", review });
  } catch (error) {
    console.error("❌ Yorum güncellenirken hata:", error);
    res.status(500).json({ error: "Yorum güncellenirken hata oluştu!", details: error.message });
  }
};

// ✅ **Yorumu sil**
export const deleteReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const reviewId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({ error: "Geçersiz yorum ID!" });
    }

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ error: "Yorum bulunamadı!" });

    if (review.user.toString() !== userId) {
      return res.status(403).json({ error: "Bu yorumu silme yetkiniz yok!" });
    }

    await review.deleteOne();

    // ✅ Ürünün ortalama puanını güncelle
    const avgRating = await Review.calculateAverageRating(review.product);
    await Product.findByIdAndUpdate(review.product, { averageRating: avgRating });

    res.status(200).json({ message: "Yorum başarıyla silindi!" });
  } catch (error) {
    console.error("❌ Yorum silinirken hata:", error);
    res.status(500).json({ error: "Yorum silinirken hata oluştu!", details: error.message });
  }
};
