import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true }, // Ürün adı (title)
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
});

const invoiceSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [invoiceItemSchema],
  totalAmount: { type: Number, required: true },
  taxRate: { type: Number, default: 19 },
  taxAmount: { type: Number, default: 0 },
  issuedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "paid", "overdue"], default: "pending" },
  invoiceNumber: { type: String, unique: true },
  companyInfo: { // Dinamik şirket bilgileri (opsiyonel)
    name: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    logoUrl: { type: String }
  }
}, { timestamps: true });

export default mongoose.model("Invoice", invoiceSchema);

