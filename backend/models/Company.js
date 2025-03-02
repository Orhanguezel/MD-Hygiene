import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, unique: true },
    taxNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    bankDetails: {
      bankName: { type: String, required: true },
      iban: { type: String, required: true },
      swiftCode: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);
