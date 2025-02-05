import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    trackingNumber: { type: String, required: true, unique: true },
    status: { type: String, enum: ["pending", "shipped", "delivered"], default: "pending" },
    estimatedDelivery: { type: Date },
    carrier: { type: String }, // DHL, UPS, vb.
  },
  { timestamps: true }
);

const Shipment = mongoose.model("Shipment", shipmentSchema);
export default Shipment;
