import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // ✅ Kategoriye referans
    images: [{ type: String }]
  },
  { timestamps: true } // ✅ `createdAt` ve `updatedAt` otomatik eklenir
);

const Product = mongoose.model("Product", productSchema);
export default Product;
