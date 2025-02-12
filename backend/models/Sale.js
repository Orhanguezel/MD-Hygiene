import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  totalAmount: { type: Number, required: true },
  taxAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["credit_card", "paypal", "bank_transfer"], required: true },
  saleDate: { type: Date, default: Date.now }, // Satış tarihi
}, { timestamps: true });

const Sale = mongoose.model("Sale", saleSchema);
export default Sale;
