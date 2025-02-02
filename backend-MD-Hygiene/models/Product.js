import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: {
    type: String,
    enum: [
      "Toilettenpapier",
      "Handpapiertücher",
      "Seife",
      "Handschuhe",
      "Glasreiniger",
      "Toilettenreiniger",
      "Allzweckreiniger",
      "SC Gel",
      "SC Flüssig"
    ],
    required: true
  },
  brand: { type: String, required: true },
  unit: { type: String, enum: ["Stück", "Liter", "Kilogramm", "Packung"], required: true },
  weight: { type: String },  // 🔹 Als String gespeichert, um Einheiten zu unterstützen
  volume: { type: String },  // 🔹 "N/A" erlaubt für Produkte ohne Volumen
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;

