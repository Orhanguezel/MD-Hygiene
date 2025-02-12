import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  taxAmount: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ["draft", "submitted", "approved", "rejected"], 
    default: "draft" 
  }, 
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Offer = mongoose.model("Offer", offerSchema);
export default Offer;
