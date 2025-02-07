import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, required: true },
  validFrom: { type: Date, required: true },
  validUntil: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: null },
}, { timestamps: true });

const Discount = mongoose.model("Discount", discountSchema);
export default Discount;
