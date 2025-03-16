import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // ✅ Aynı isimde kategori eklenmesini önler
    image: { type: String}
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
