import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ProductID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    StoreID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    StockSold: {
      type: Number,
      required: true,
    },
    SaleDate: {
      type: Date,
      default: Date.now,
    },
    TotalSaleAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Sale = mongoose.model("Sale", saleSchema);
export default Sale;
