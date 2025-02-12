import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  brand: { type: String, required: true },
  unit: { type: String, enum: ["Stück", "Liter", "Kilogramm", "Packung"], required: true },
  weight: { type: String },
  volume: { type: String },
  gtin_ean: { type: String, unique: true }, // 🔹 Barkod numarası eklendi
  reach_compliance: { type: Boolean, default: false }, // 🔹 REACH uyumu eklendi
  images: [{ type: String }], // 🔹 Ürün görselleri eklendi
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
