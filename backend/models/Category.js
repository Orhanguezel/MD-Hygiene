import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  parentCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null }, // Alt kategori ilişkisi
}, { timestamps: true });

// ✅ Eksik olan model tanımlaması eklendi
const Category = mongoose.model("Category", categorySchema);

export default Category;
