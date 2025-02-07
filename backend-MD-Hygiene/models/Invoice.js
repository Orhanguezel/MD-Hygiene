import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number },
    unitPrice: { type: Number }
  }],
  totalAmount: { type: Number, required: true },
  taxRate: { type: Number, default: 19 }, // Varsayılan %19 KDV
  taxAmount: { type: Number, default: 0 },
  issuedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "paid", "overdue"], default: "pending" },
  invoiceNumber: { type: String, unique: true },
}, { timestamps: true });

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
