import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  editedAt: { type: Date }, // Kullanıcı yorum güncellerse tarih kaydı tutulacak
}, { timestamps: true });

reviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    { $group: { _id: "$product", averageRating: { $avg: "$rating" } } },
  ]);
  return result.length ? result[0].averageRating : 0;
};

const Review = mongoose.model("Review", reviewSchema);
export default Review;

