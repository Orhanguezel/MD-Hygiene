import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // ✅ JSON'daki id değerini koruyoruz
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  images: [{ type: String }],

  category: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String },
    creationAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },

  gtin_ean: { 
    type: String, 
    default: undefined, // ✅ `null` değerlerini `undefined` yaparak hatayı engelle
  },

  creationAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: false });

const Product = mongoose.model("Product", productSchema);

export default Product;
