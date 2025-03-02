import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true },
  }],
  totalAmount: { type: Number, required: true },
  taxAmount: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ["pending", "processing", "shipped", "delivered", "cancelled", "archived"], // ✅ `archived` eklendi
    default: "pending" 
  },
  shippingAddress: {
    street: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  trackingNumber: { type: String },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);

