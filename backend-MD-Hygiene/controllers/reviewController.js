import Review from "../models/Review.js";

export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId });

    if (!reviews.length) {
      return res.status(404).json({ error: "Yorum bulunamadı!" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Yorumlar alınırken hata oluştu!" });
  }
};

export const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!productId || !rating || !comment) {
      return res.status(400).json({ error: "Tüm alanlar zorunludur!" });
    }

    const newReview = new Review({ product: productId, rating, comment });
    await newReview.save();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: "Yorum eklenirken hata oluştu!" });
  }
};
