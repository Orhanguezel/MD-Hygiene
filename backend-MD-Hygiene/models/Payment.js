import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["credit_card", "paypal", "stripe"], required: true },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    transactionId: { type: String, unique: true },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
